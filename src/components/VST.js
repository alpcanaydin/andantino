import React, { Component, PropTypes } from 'react';
import Keyboard from './Keyboard';

class VST extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      octaves: 4
    };

    this.getHistory = this.getHistory.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);

    this.sequence = [];
    this.history = [];
  }

  componentWillMount() {
    this.updateWidth();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }

  getHistory() {
    return this.history.map(history => ({
      note: history.note,
      duration: Number(((history.keyReleased - history.keyPressed) / 1000).toFixed(1)),
      time: Number(((history.keyPressed - this.history[0].keyPressed) / 1000).toFixed(2))
    }));
  }

  clearHistory() {
    this.history = [];
  }

  updateWidth() {
    const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    const height = Math.round(width / 20);

    const octaves = Math.ceil(width / 250);

    this.setState({
      width: width - 70,
      height,
      octaves: octaves > 4 ? 4 : 3
    });
  }

  handlePlay(note) {
    const { instrument } = this.props;
    const node = instrument.start(note, 0, { release: 0.5 });
    const keyPressed = Date.now();
    this.sequence.push({ node, note, keyPressed });
    this.history.push({
      note,
      keyPressed,
      keyReleased: Date.now()
    });
  }

  handleStop(note) {
    const newSequence = [];

    this.sequence.forEach((item) => {
      if (item.note === note) {
        item.node.stop();
        this.history = this.history.map((history) => {
          if (history.note === item.note && item.keyPressed === history.keyPressed) {
            return {
              note: history.note,
              keyPressed: history.keyPressed,
              keyReleased: Date.now()
            };
          }

          return history;
        });
      } else {
        newSequence.push(item);
      }
    });

    this.sequence = newSequence;
  }

  render() {
    const { width, octaves } = this.state;

    return (
      <Keyboard
        width={width}
        octaves={octaves}
        startNote="C3"
        onKeyDown={this.handlePlay}
        onKeyUp={this.handleStop}
        keyboardStyle={{
          cursor: 'default',
          padding: 0,
          position: 'relative',
          listStyle: 'none',
          margin: 0,
          marginTop: '35px',
          WebkitUserSelect: 'none'
        }}
        activeWhiteKeyStyle={{
          backgroundColor: '#38D9A9',
          borderBottomStyle: 'solid',
          borderBottomColor: '#099268'
        }}
        activeBlackKeyStyle={{
          backgroundColor: '#38D9A9',
          borderBottomStyle: 'solid',
          borderBottomColor: '#099268'
        }}
        whiteKeyStyle={{
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '4px',
          marginRight: '1px',
          boxSizing: 'border-box',
          borderBottomStyle: 'solid',
          borderBottomColor: '#D2D8DD'
        }}
        blackKeyStyle={{
          backgroundColor: '#0A2747',
          border: 'none',
          borderRadius: '4px',
          marginRight: '1px',
          boxSizing: 'border-box',
          borderBottomStyle: 'solid',
          borderBottomColor: '#05182F',
          zIndex: 10
        }}
      />
    );
  }
}

VST.propTypes = {
  instrument: PropTypes.object.isRequired
};

export default VST;

