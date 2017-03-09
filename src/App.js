import React, { Component } from 'react';

import Orientation from './components/Orientation';
import Logo from './components/Logo';
import Splash from './components/Splash';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Orientation />
        <div className="aligner">
          <div className="aligner-item aligner-item-top">
            <Logo />
          </div>
          <div className="aligner-item text-center">
            <Splash />
          </div>
          <div className="aligner-item aligner-item-bottom">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
