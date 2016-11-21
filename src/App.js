import React, { Component } from 'react';
// import Gameboard from './components/Gameboard.js';
// import Scoreboard from './components/Scoreboard.js';
import Announcement from './components/Announcement.js';
import ResetButton from './components/ResetButton.js'
import Tile from './components/Tile.js';
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
      winner: null
    }
  }

  updateBoard(loc, player) {
    if (this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o' || this.state.winner) {
      // If they click a tile that already exists or game is over
      return;
    }

    let currentGameBoard = this.state.gameBoard;
    currentGameBoard.splice(loc, 1, this.state.turn);
    this.setState({gameBoard: currentGameBoard});

    let topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2];

    if (topRow.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5];

    if (middleRow.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let bottomRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8];

    if (bottomRow.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let firstCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6];

    if (firstCol.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let middleCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7];

    if (middleCol.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let lastCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8];

    if (lastCol.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let leftDag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8];

    if (leftDag.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let rightDag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6];

    if (rightDag.match(/xxx|ooo/)) {
      this.setState({winner: this.state.turn});
      return;
    }

    let moves = this.state.gameBoard.join('').replace(/ /g, '');

    if (moves.length === 9) {
      this.setState({winner: 'd'});
    }

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
      winner: null
    })
  }

  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1>Tic Tac Toe </h1>
          <Announcement winner={this.state.winner}/>
          <ResetButton reset={this.resetBoard.bind(this)} />
        </div>

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
    );
  }
}

export default App;
