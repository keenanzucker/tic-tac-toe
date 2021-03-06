import React, { Component } from 'react';
import '../stylesheets/LandingPage.css';


class LandingPage extends Component {
  render() {
    return (
      <div className={((this.props.numPlayers === 0) ? "visible" : "hidden") + " container landing-container"}>
        <h1 className="title-text"> Welcome to Tic Tac Toe!</h1>
        <h3 className="sub-text"> Select the type of game: </h3>
        <button className="player-button one-easy" onClick={this.props.onePlayerEasy}> One Player - Easy</button>
        <button className="player-button one-hard" onClick={this.props.onePlayerHard}> One Player - Hard</button>
        <button className="player-button two" onClick={this.props.twoPlayer}> Two Player </button>
      </div>
    );
  }
}

export default LandingPage;
