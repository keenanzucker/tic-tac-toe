import React, { Component } from 'react';
import '../stylesheets/Scoreboard.css';


class Scoreboard extends Component {
  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'hidden'}>
      	<h2 className={(this.props.winner !== 'd') ? 'visible' : 'hidden'}> The winner is: <strong>{this.props.winner} !</strong> </h2>
      	<h2 className={(this.props.winner === 'd') ? 'visible' : 'hidden'}> Draw! </h2>
      </div>
    );
  }
}

export default Scoreboard;
