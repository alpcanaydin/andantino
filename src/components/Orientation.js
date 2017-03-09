import React, { Component } from 'react';
import './Orientation.css';

class Orientation extends Component {
  constructor(props) {
    super(props);

    this.state = { showWarning: false };

    this.setWarningStatus = this.setWarningStatus.bind(this);
  }

  componentWillMount() {
    if (typeof window.orientation === 'undefined') {
      return;
    }

    window.addEventListener('orientationchange', this.setWarningStatus);
    this.setWarningStatus();
  }

  setWarningStatus() {
    this.setState({ showWarning: window.orientation === 0 });
  }

  render() {
    const { showWarning } = this.state;

    if (!showWarning) {
      return null;
    }

    return (
      <div className="orientation">
        <div className="gap-bottom-large">andantino.</div>
        Please use your device in landscape mode.
      </div>
    );
  }
}

export default Orientation;
