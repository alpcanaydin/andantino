import React, { Component, PropTypes } from 'react';

class GameEnd extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRestart = this.handleRestart.bind(this);
  }

  handleRestart() {
    this.context.restart();
  }

  render() {
    const { getScore } = this.context;

    return (
      <div>
        <h1 className="gap-bottom-large">Game Finished!</h1>
        <p>Your score</p>
        <h1 className="gap-bottom-large">{getScore()}</h1>
        <br />
        <p>Max Available Score</p>
        <h1 className="gap-bottom-large">235</h1>
        <button className="button" onClick={this.handleRestart}>
          Play Again
        </button>
      </div>
    );
  }
}

GameEnd.contextTypes = {
  getScore: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired
};

export default GameEnd;
