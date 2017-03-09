import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import VST from './VST';

class Level extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      countdown: 3,
      userTurn: false,
      userStarted: false,
      levelFinished: false,
      levelScore: 0
    };

    this.play = this.play.bind(this);
    this.getScoreMessage = this.getScoreMessage.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.handleListenAgain = this.handleListenAgain.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleResetLevel = this.handleResetLevel.bind(this);
    this.handleRestartLevel = this.handleRestartLevel.bind(this);
    this.handleNextScene = this.handleNextScene.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.countdown === 0) {
        clearInterval(this.interval);
        this.play();
        return;
      }

      this.setState({ countdown: this.state.countdown - 1 });
    }, 1000);
  }

  getScoreMessage() {
    const { levelScore } = this.state;
    const { schedule } = this.props;

    const maxScore = schedule.length;

    if (maxScore === levelScore) {
      return {
        title: 'Perfect!',
        message: 'You are awesome. What a talent!'
      };
    }

    if (levelScore >= 0) {
      return {
        title: 'Not Bad!',
        message: 'Looks good. You are almost there.'
      };
    }

    return {
      title: 'Nooo :(',
      message: 'Your are terrible. Work harder!'
    };
  }

  calculateScore() {
    const { schedule } = this.props;
    const history = this.vst.getHistory();

    let score = 0;

    if (history.length !== schedule.length) {
      score -= Math.abs(history.length - schedule.length);
    }

    const requiredHistory = history.slice(0, schedule.length);

    for (let i = 0; i < requiredHistory.length; i++) {
      const currentTime = schedule[i].time;
      const availableNotes = schedule
        .filter(item => item.time === currentTime)
        .map(item => item.note)
      ;

      if (!availableNotes.includes(requiredHistory[i].note)) {
        score--;
      } else if (Math.abs(requiredHistory[i].duration - schedule[i].duration) > 0.8) {
        score--;
      } else {
        score++;
      }
    }

    return score;
  }

  play() {
    const { instrument } = this.context;
    const { schedule, showVST } = this.props;

    instrument.schedule(0, schedule);

    setTimeout(() => {
      this.setState({ userTurn: true });
    }, (showVST + 0.3) * 1000);

    instrument.on('started', () => {
      if (this.state.userStarted || !this.state.userTurn) {
        return;
      }

      this.setState({ userStarted: true });
    });
  }

  handleListenAgain() {
    this.vst.clearHistory();
    this.setState({
      userStarted: false,
      userTurn: false
    }, () => {
      this.play();
    });
  }

  handleCheck() {
    const score = this.calculateScore();
    this.setState({
      levelFinished: true,
      levelScore: score
    });
  }

  handleRestartLevel() {
    this.setState({
      countdown: 0,
      userTurn: false,
      userStarted: false,
      levelFinished: false,
      levelScore: 0
    }, () => {
      this.play();
    });
  }

  handleResetLevel() {
    this.vst.clearHistory();
    this.setState({
      userTurn: true,
      userStarted: false,
      levelFinished: false,
      levelScore: 0
    });
  }

  handleNextScene() {
    this.context.updateScore(this.state.levelScore);
    this.context.setScene(this.props.nextScene);
  }

  render() {
    const { countdown, userTurn, userStarted, levelFinished, levelScore } = this.state;
    const { instrument } = this.context;
    const { title, description, schedule, nextScene } = this.props;

    if (levelFinished) {
      const { title: scoreTitle, message: scoreMessage } = this.getScoreMessage();
      return (
        <div>
          <h1>{scoreTitle}</h1>
          <p className="gap-bottom-large">{scoreMessage}</p>
          <p className="gap-bottom">
            <strong>Level Score:</strong> {levelScore} / {schedule.length}<br />
          </p>

          <div className="buttonGroup">
            <button
              className="button"
              onClick={this.handleRestartLevel}
            >
              Restart Level
            </button>
            <button
              className="button"
              onClick={this.handleNextScene}
            >
              {nextScene === 'gameEnd' ? 'Finish Game' : 'Next Level'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1 className="gap-bottom-large">{title}</h1>

        {userTurn ?
          <div>
            <p className="pad-bottom-large">Play what you heard.</p>
            <div className="gap-bottom-large">
              <VST
                instrument={instrument}
                ref={(ref) => { this.vst = ref; }}
              />
            </div>
            <div className="buttonGroup">
              <button
                className="button"
                onClick={this.handleListenAgain}
              >
                Listen Again
              </button>
              <button
                className={cx('button', { disabled: !userStarted })}
                onClick={this.handleResetLevel}
              >
                Reset Level
              </button>
              <button
                className={cx('button', { disabled: !userStarted })}
                onClick={this.handleCheck}
              >
                Check!
              </button>
            </div>
          </div>
          :
          <div>
            {countdown > 0 &&
              <p>{description}<br />Starting in {countdown} seconds.</p>
            }
            {countdown === 0 && <p>Listen the notes.</p>}
          </div>
        }
      </div>
    );
  }
}

Level.contextTypes = {
  instrument: PropTypes.object.isRequired,
  setScene: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired
};

Level.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  nextScene: PropTypes.string.isRequired,
  showVST: PropTypes.number.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.shape({
    note: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired
  })).isRequired
};

export default Level;
