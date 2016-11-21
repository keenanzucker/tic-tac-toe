import React, { Component } from 'react';
import '../stylesheets/LandingPage.css';


class LandingPage extends Component {
  render() {
    return (
      <div className={((this.props.numPlayers === 0) ? "visible" : "hidden") + " container landing-container"}>
        <h1 className="title-text"> Welcome to Tic Tac Toe!</h1>
        <h2> Select the type of game: </h2>
        <button className="player-button" onClick={this.props.onePlayer}> One Player </button>
        <button className="player-button" onClick={this.props.twoPlayer}> Two Player </button>
      </div>
    );
  }
}

export default LandingPage;
