import React, { Component } from 'react';
import Scoreboard from './components/Scoreboard.js';
import ResetButton from './components/ResetButton.js'
import Tile from './components/Tile.js';
import LandingPage from './components/LandingPage.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gameBoard: [
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null,
      numPlayers: 0
    }
  }

  onePlayer() {
    this.setState({numPlayers: 1});
  }

  twoPlayer() {
    this.setState({numPlayers: 2});
  }

  updateBoard(loc) {
    if (this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o' || this.state.winner) {
      // If they click a tile that already exists or game is over
      return;
    }

    let curGameBoard = this.state.gameBoard;

    // enter x or o into board location
    curGameBoard.splice(loc, 1, this.state.turn);

    // update state to current game board
    this.setState({gameBoard: curGameBoard});

    // create array of possible win states
    let winStates = [];

    winStates.push(curGameBoard[0] + curGameBoard[1] + curGameBoard[2]);
    winStates.push(curGameBoard[3] + curGameBoard[4] + curGameBoard[5]);
    winStates.push(curGameBoard[6] + curGameBoard[7] + curGameBoard[8]);
    winStates.push(curGameBoard[0] + curGameBoard[3] + curGameBoard[6]);
    winStates.push(curGameBoard[1] + curGameBoard[4] + curGameBoard[7]);
    winStates.push(curGameBoard[2] + curGameBoard[5] + curGameBoard[8]);
    winStates.push(curGameBoard[0] + curGameBoard[4] + curGameBoard[8]);
    winStates.push(curGameBoard[2] + curGameBoard[4] + curGameBoard[6]);

    // check all of win states
    for (let i = 0; i < winStates.length; i++) {
      if (winStates[i].match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return
      }
    }

    // check if the game is a draw
    let moves = this.state.gameBoard.join('').replace(/ /g, '');
    if (moves.length === 9) {
      this.setState({winner: 'd'});
    }

    // change the player's turn
    this.setState({turn: (this.state.turn === 'x') ? 'o' : 'x'});
  }

  resetBoard() {
    // Set the board back to the original settings
    this.setState({
      gameBoard: [
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null,
      numPlayers: 0
    })
  }

  render() {
    return (
      <div className="container">
        <LandingPage
          onePlayer={this.onePlayer.bind(this)}
          twoPlayer={this.twoPlayer.bind(this)}
          numPlayers={this.state.numPlayers}
        />
        <Scoreboard winner={this.state.winner}/>
        <div className="menu">
          <h1 className="title">Tic Tac Toe </h1>
          <ResetButton reset={this.resetBoard.bind(this)} />
        </div>

        <div className="game-board container">
          {this.state.gameBoard.map(function(value, i) {
            return (
              <Tile
                key={i}
                loc={i}
                value={value}
                updateBoard={this.updateBoard.bind(this)}
                turn={this.state.turn}
              />
            )
          }.bind(this))}
        </div>
      </div>
    );
  }
}

export default App;
