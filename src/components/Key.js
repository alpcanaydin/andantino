import React, { Component, PropTypes } from 'react';

class Key extends Component {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.createStyle = this.createStyle.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);

    // SHAME!!!
    window.keyboardKeyPressed = false;
  }

  play() {
    this.handleMouseDown();
  }

  stop() {
    this.handleMouseUp();
  }

  handleMouseDown() {
    window.keyboardKeyPressed = true;
    this.setState({ active: true });
    this.props.onKeyDown(this.props.note);
  }

  handleMouseUp() {
    window.keyboardKeyPressed = false;
    this.setState({ active: false });
    this.props.onKeyUp(this.props.note);
  }

  handleMouseOver() {
    if (window.keyboardKeyPressed) {
      this.setState({ active: true });
      this.props.onKeyDown(this.props.note);
    }
  }

  handleMouseOut() {
    if (window.keyboardKeyPressed) {
      this.setState({ active: false });
      this.props.onKeyUp(this.props.note);
    }
  }

  createStyle() {
    const { active } = this.state;
    const { style, activeStyle } = this.props;

    return Object.assign(
      {},
      {
        display: 'inline-block',
        WebkitUserSelect: 'none'
      },
      style,
      active ? activeStyle : {}
    );
  }

  render() {
    const style = this.createStyle();

    return (
      <li
        className="keyboardKey"
        style={style}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onTouchStart={this.handleMouseDown}
        onTouchEnd={this.handleMouseUp}
        onTouchCancel={this.handleMouseOut}
      />
    );
  }
}

Key.propTypes = {
  note: PropTypes.string.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  activeStyle: PropTypes.object.isRequired
};

export default Key;
