import React, { Component } from 'react';


class ResetButton extends Component {

  render() {
    return (
    <button onClick={this.props.reset}>New Game</button>
    );
  }
}


export default ResetButton;
