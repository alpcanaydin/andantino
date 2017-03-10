import React, { Component } from 'react';
import SamplerLoader from '../lib/SamplerLoader';
import Instrument from '../lib/Instrument';
import Game from './Game';

class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      gameStarted: false
    };
    this.handleGameStart = this.handleGameStart.bind(this);
  }

  componentWillMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ac = new AudioContext();
    const samplerLoader = new SamplerLoader(ac, {
      uri: 'instruments',
      file: 'piano.json'
    });

    samplerLoader.load().then((sampler) => {
      this.instrument = new Instrument(sampler, ac, { gain: 3, release: 1 });
      this.setState({ loading: false });
    });
  }

  handleGameStart() {
    this.setState({ gameStarted: true });
  }

  render() {
    const { loading, gameStarted } = this.state;

    if (gameStarted) {
      return <Game instrument={this.instrument} />;
    }

    return (
      <div>
        <h1 className="gap-bottom">Andantino</h1>
        <p className="gap-bottom-large">
          Listen to the melody and try to guess notes you hear.<br />
          Use your mouse or keyboard to play.
        </p>

        {loading ?
          <button className="button disabled">Loading...</button>
        :
          <button
            className="button"
            onClick={this.handleGameStart}
          >
            Start Playing
          </button>
        }
      </div>
    );
  }
}

export default Splash;
