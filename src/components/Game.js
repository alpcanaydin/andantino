import React, { Component, PropTypes } from 'react';
import {
  Practice,
  Level1,
  Level2,
  Level3,
  Level4,
  Level5,
  Level6,
  Level7,
  Level8,
  GameEnd
} from './scenes';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scene: 'practice',
      score: 0
    };

    this.sceneMap = new Map([
      ['practice', Practice],
      ['level1', Level1],
      ['level2', Level2],
      ['level3', Level3],
      ['level4', Level4],
      ['level5', Level5],
      ['level6', Level6],
      ['level7', Level7],
      ['level8', Level8],
      ['gameEnd', GameEnd]
    ]);

    this.setScene = this.setScene.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.getScore = this.getScore.bind(this);
    this.restart = this.restart.bind(this);
  }

  getChildContext() {
    return {
      instrument: this.props.instrument,
      setScene: this.setScene,
      updateScore: this.updateScore,
      getScore: this.getScore,
      restart: this.restart
    };
  }

  setScene(scene) {
    if (!this.sceneMap.has(scene)) {
      throw new Error('Scene not found.');
    }

    this.setState({ scene });
  }

  getScore() {
    return this.state.score;
  }

  updateScore(score) {
    this.setState({ score: this.state.score + score });
  }

  restart() {
    this.setState({
      scene: 'practice',
      score: 0
    });
  }

  render() {
    const { scene } = this.state;
    const CurrentScene = this.sceneMap.get(scene);

    return <CurrentScene />;
  }
}

Game.childContextTypes = {
  instrument: PropTypes.object,
  setScene: PropTypes.func,
  updateScore: PropTypes.func,
  getScore: PropTypes.func,
  restart: PropTypes.func
};

Game.propTypes = {
  instrument: PropTypes.object.isRequired
};

export default Game;
