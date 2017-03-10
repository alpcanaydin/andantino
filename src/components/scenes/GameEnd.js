import React, { Component, PropTypes } from 'react';

class GameEnd extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRestart = this.handleRestart.bind(this);
    this.handleFacebookShare = this.handleFacebookShare.bind(this);
    this.handleTwitterShare = this.handleTwitterShare.bind(this);
  }

  handleRestart() {
    this.context.restart();
  }

  handleFacebookShare() {
    const { getScore } = this.context;

    const score = getScore();

    window.FB.ui({
      method: 'share',
      href: 'https://alpcanaydin.github.io/andantino',
      quote: `Are you tone-deaf or not? I got ${score} points. It is your turn!`
    });
  }

  handleTwitterShare() {
    const { getScore } = this.context;

    const score = getScore();
    const url = `https://twitter.com/share?url=${window.location.href}&hashtags=andantino&text=I just got ${score} points in Andantino.`;

    const width = 550;
    const height = 400;

    const windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    const windowHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    const left = (windowWidth - width) / 2;
    const top = (windowHeight - height) / 2;

    const popupOptions = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, 'twitter', popupOptions);
  }

  render() {
    const { getScore } = this.context;

    return (
      <div>
        <h1 className="gap-bottom-large">Game Finished!</h1>
        <p>Your score</p>
        <h1 className="gap-bottom-large">{getScore()}</h1>
        <div className="gap-bottom-large">
          <button className="button" onClick={this.handleRestart}>
            Play Again
          </button>
        </div>
        <br />
        <p className="gap-bottom">Share Your Score</p>
        <div className="buttonGroup gap-bottom-large">
          <button className="button facebook" onClick={this.handleFacebookShare}>
            Facebook
          </button>
          <button className="button twitter" onClick={this.handleTwitterShare}>
            Twitter
          </button>
        </div>
      </div>
    );
  }
}

GameEnd.contextTypes = {
  getScore: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired
};

export default GameEnd;
