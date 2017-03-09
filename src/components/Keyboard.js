import React, { Component, PropTypes } from 'react';
import Key from './Key';

class Keyboard extends Component {
  constructor(props) {
    super(props);

    this.keyMap = {
      65: 'Cl',
      87: 'C#l',
      83: 'Dl',
      69: 'D#l',
      68: 'El',
      70: 'Fl',
      84: 'F#l',
      71: 'Gl',
      89: 'G#l',
      90: 'G#l',
      72: 'Al',
      85: 'A#l',
      74: 'Bl',
      75: 'Cu',
      79: 'C#u',
      76: 'Du',
      80: 'D#u',
      59: 'Eu',
      186: 'Eu',
      222: 'Fu',
      221: 'F#u',
      220: 'Gu',
      73: 'Fu'
    };

    this.startOctave = parseInt(this.props.startNote.charAt(1), 10);
    this.whiteNotes = this.orderNotes(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    this.notesWithSharps = this.orderNotes(['C', 'D', 'F', 'G', 'A']);
    this.keyPressOffset = this.whiteNotes[0] === 'C' ? 0 : 1;

    this.createKeys = this.createKeys.bind(this);
    this.handleLetterDown = this.handleLetterDown.bind(this);
    this.handleLetterUp = this.handleLetterUp.bind(this);

    this.keyRefs = {};

    // SHAME!!!
    window.keyboardLettersDown = {};
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleLetterDown);
    window.addEventListener('keyup', this.handleLetterUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleLetterDown);
    window.removeEventListener('keyup', this.handleLetterUp);
  }

  handleLetterDown(event) {
    /* eslint-disable no-prototype-builtins */
    if (window.keyboardLettersDown.hasOwnProperty(event.keyCode)) {
      return;
    }

    window.keyboardLettersDown[event.keyCode] = true;

    if (typeof this.keyMap[event.keyCode] !== 'undefined') {
      const note = this.convertKeyCodeToNote(event.keyCode);
      this.keyRefs[note].play();
    }
  }

  handleLetterUp(event) {
    delete window.keyboardLettersDown[event.keyCode];

    if (typeof this.keyMap[event.keyCode] !== 'undefined') {
      const note = this.convertKeyCodeToNote(event.keyCode);
      this.keyRefs[note].stop();
    }
  }

  convertKeyCodeToNote(keyCode) {
    const { octaves } = this.props;
    const targetOctave = Math.floor((octaves - 1) / 2);

    return this.keyMap[keyCode]
      .replace('l', parseInt(this.startOctave + targetOctave, 10) + this.keyPressOffset)
      .replace('u', (parseInt(this.startOctave + targetOctave, 10) + this.keyPressOffset + 1)
      .toString())
    ;
  }

  orderNotes(notes) {
    const { startNote } = this.props;
    const orderedNotes = [];
    let keyOffset = 0;

    for (let i = 0; i < notes.length; i++) {
      if (startNote.charAt(0) === notes[i]) {
        keyOffset = i;
        break;
      }
    }

    for (let i = 0; i < notes.length; i++) {
      if (i + keyOffset > notes.length - 1) {
        orderedNotes[i] = notes[i + keyOffset - notes.length];
      } else {
        orderedNotes[i] = notes[i + keyOffset];
      }
    }

    return orderedNotes;
  }

  createKeys() {
    const { octaves, width, whiteKeyStyle, blackKeyStyle } = this.props;
    const keys = [];

    const totalWhiteKeys = octaves * 7;

    const whiteKeyWidth = Math.floor((width - totalWhiteKeys) / totalWhiteKeys);
    const blackKeyWidth = Math.floor(whiteKeyWidth / 1.2);

    const keyHeight = whiteKeyWidth * 4;

    let noteCounter = 0;
    let octaveCounter = this.startOctave;

    for (let index = 0; index < totalWhiteKeys; index++) {
      if (index % this.whiteNotes.length === 0) {
        noteCounter = 0;
      }

      const bizarreNoteCounter = this.whiteNotes[noteCounter];

      if (bizarreNoteCounter === 'C' && index !== 0) {
        octaveCounter++;
      }

      keys.push({
        type: 'white',
        octave: octaveCounter,
        note: `${this.whiteNotes[noteCounter]}${octaveCounter}`,
        style: Object.assign(
          {},
          whiteKeyStyle,
          {
            width: `${whiteKeyWidth}px`,
            height: `${keyHeight}px`,
            borderBottomWidth: `${whiteKeyWidth / 1.5}px`
          }
        )
      });

      if (index !== totalWhiteKeys - 1) {
        /* eslint-disable no-loop-func */
        this.notesWithSharps.forEach((note) => {
          if (note === this.whiteNotes[noteCounter]) {
            keys.push({
              type: 'black',
              octave: octaveCounter,
              note: `${this.whiteNotes[noteCounter]}#${octaveCounter}`,
              style: Object.assign(
                {},
                blackKeyStyle,
                {
                  position: 'absolute',
                  left: `${Math.floor(((whiteKeyWidth + 1) * (index + 1)) - (blackKeyWidth / (octaves * 1.5)))}px`,
                  top: `-${blackKeyWidth / 1.5}px`,
                  width: `${blackKeyWidth}px`,
                  height: `${keyHeight / 1.5}px`,
                  borderBottomWidth: `${blackKeyWidth / 1.5}px`
                }
              )
            });
          }
        });
      }

      noteCounter++;
    }

    keys[keys.length - 1].style.marginRight = '0';

    return keys;
  }

  render() {
    const {
      keyboardStyle,
      width,
      activeWhiteKeyStyle,
      activeBlackKeyStyle,
      onKeyDown,
      onKeyUp
    } = this.props;

    const style = Object.assign(
      {},
      keyboardStyle,
      {
        width: `${width}px`
      }
    );

    const keys = this.createKeys();

    return (
      <ul style={style}>
        {keys.map(key =>
          <Key
            key={key.note}
            ref={(ref) => { this.keyRefs[key.note] = ref; }}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            activeStyle={key.type === 'white' ? activeWhiteKeyStyle : activeBlackKeyStyle}
            {...key}
          />
        )}
      </ul>
    );
  }
}

Keyboard.defaultProps = {
  keyboardStyle: {
    cursor: 'default',
    fontSize: '0px',
    padding: 0,
    position: 'relative',
    listStyle: 'none',
    margin: 0,
    WebkitUserSelect: 'none'
  },

  whiteKeyStyle: {
    backgroundColor: 'white',
    border: '1px solid #000',
    borderRightWidth: 0,
    borderRadius: '4px'
  },

  blackKeyStyle: {
    backgroundColor: 'black',
    border: '1px solid #000',
    borderRadius: '4px'
  },

  activeWhiteKeyStyle: {
    backgroundColor: 'green'
  },

  activeBlackKeyStyle: {
    backgroundColor: 'green'
  },

  onKeyDown: () => {},
  onKeyUp: () => {}
};

Keyboard.propTypes = {
  width: PropTypes.number.isRequired,
  startNote: PropTypes.string.isRequired,
  octaves: PropTypes.number.isRequired,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  keyboardStyle: PropTypes.object,
  whiteKeyStyle: PropTypes.object,
  blackKeyStyle: PropTypes.object,
  activeWhiteKeyStyle: PropTypes.object,
  activeBlackKeyStyle: PropTypes.object
};

export default Keyboard;
