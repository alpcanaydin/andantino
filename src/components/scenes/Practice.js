import React, { Component, PropTypes } from 'react';
import VST from '../VST';

class Practice extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.context.setScene('level1');
  }

  render() {
    const { instrument } = this.context;

    return (
      <div>
        <h1 className="gap-bottom">Practice yourself!</h1>
        <div className="box hidden-mobile">
          <p className="gap-bottom">
            Here is your keyboard, practice as long as you wish.
          </p>

          <p style={{ marginBottom: '65px' }}>
            <strong>Tips:</strong>&nbsp;
            C3 is the A key in your keyboard and it continues like MIDI keyboard.
            Timing is also important to get score. You will lose points if you hit the note
            too short or too long.
          </p>

        </div>

        <div className="gap-bottom-large">
          <VST instrument={instrument} />
        </div>

        <button className="button" onClick={this.handleClick}>
          I'm Ready!
        </button>
      </div>
    );
  }
}

Practice.contextTypes = {
  instrument: PropTypes.object.isRequired,
  setScene: PropTypes.func.isRequired
};

export default Practice;
