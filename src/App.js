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
      numPlayers: 0,
      maxPlayer: 'x',
      minPlayer: 'o'
    }
  }

  onePlayer() {
    this.setState({numPlayers: 1});
  }

  twoPlayer() {
    this.setState({numPlayers: 2});
  }

  copyBoard(board) {
    return board.slice(0);
  }

  winner(board, player){
    if (
          (board[0] === player && board[1] === player && board[2] === player) ||
          (board[3] === player && board[4] === player && board[5] === player) ||
          (board[6] === player && board[7] === player && board[8] === player) ||
          (board[0] === player && board[3] === player && board[6] === player) ||
          (board[1] === player && board[4] === player && board[7] === player) ||
          (board[2] === player && board[5] === player && board[8] === player) ||
          (board[0] === player && board[4] === player && board[8] === player) ||
          (board[2] === player && board[4] === player && board[6] === player)
          ) {
          return true;
      } else {
          return false;
      }
  }

  tie(board) {
    let moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  checkWinner(board) {
    // creat an array of win states
    let winStates = [];

    winStates.push(board[0] + board[1] + board[2]);
    winStates.push(board[3] + board[4] + board[5]);
    winStates.push(board[6] + board[7] + board[8]);
    winStates.push(board[0] + board[3] + board[6]);
    winStates.push(board[1] + board[4] + board[7]);
    winStates.push(board[2] + board[5] + board[8]);
    winStates.push(board[0] + board[4] + board[8]);
    winStates.push(board[2] + board[4] + board[6]);

    // check all of win states
    for (let i = 0; i < winStates.length; i++) {
      if (winStates[i].match(/xxx|ooo/)) {
        this.setState({winner: this.state.turn});
        return;
      }
    }

    // check if the game is a draw
    let moves = this.state.gameBoard.join('').replace(/ /g, '');
    if (moves.length === 9) {
      this.setState({winner: 'd'});
    }
  }

  validMove(move, player, board) {
    let newBoard = this.copyBoard(board);
    if (newBoard[move] === ' ') {
      newBoard[move] = player;
      return newBoard;
    } else {
      return null;
    }
  }

  findAiMove(board) {
    let bestMoveScore = 100;
    let move = null;

    //test all possible moves if game not over
    if (this.winner(board, 'x') || this.winner(board, 'o') || this.tie(board)) {
      return null;
    }

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      if (newBoard) {
        let moveScore = this.maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  minScore(board) {
    if (this.winner(board, 'x')) {
      return 10;
    } else if (this.winner(board, 'o')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = 100;
      for(let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i, this.state.minPlayer, board);
        if (newBoard) {
          let predictedMoveValue = this.maxScore(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  maxScore(board) {
    if (this.winner(board, 'x')) {
      return 10;
    } else if (this.winner(board, 'o')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = -100;
      for(let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i, this.state.maxPlayer, board);
        if (newBoard) {
          let predictedMoveValue = this.minScore(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  gameLoop(move) {
    let player = this.state.turn;
    let curGameBoard = this.validMove(move, player, this.state.gameBoard);

    if (this.winner(curGameBoard, player)) {
      this.setState({
        gameBoard: curGameBoard,
        winner: player
      });
      return;
    }
    if (this.tie(curGameBoard)) {
      this.setState({
        gameBoard: curGameBoard,
        winner: 'd'
      });
      return;
    }

    player = 'o';
    curGameBoard = this.validMove(this.findAiMove(curGameBoard), player, curGameBoard);
    if (this.winner(curGameBoard, player)) {
      this.setState({
        gameBoard: curGameBoard,
        winner: player
      });
      return;
    }
    if (this.tie(curGameBoard)) {
      this.setState({
        gameBoard: curGameBoard,
        winner: 'd'
      });
      return;
    }
    this.setState({
      gameBoard: curGameBoard
    });
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

    this.checkWinner(curGameBoard);

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
      numPlayers: 0,
      maxPlayer: 'x',
      minPlayer: 'o'
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
                gameLoop={this.gameLoop.bind(this)}
              />
            )
          }.bind(this))}
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="container">
  //       <LandingPage
  //         onePlayer={this.onePlayer.bind(this)}
  //         twoPlayer={this.twoPlayer.bind(this)}
  //         numPlayers={this.state.numPlayers}
  //       />
  //       <Scoreboard winner={this.state.winner}/>
  //       <div className="menu">
  //         <h1 className="title">Tic Tac Toe </h1>
  //         <ResetButton reset={this.resetBoard.bind(this)} />
  //       </div>

  //       <div className="game-board container">
  //         {this.state.gameBoard.map(function(value, i) {
  //           return (
  //             <Tile
  //               key={i}
  //               loc={i}
  //               value={value}
  //               updateBoard={this.updateBoard.bind(this)}
  //               turn={this.state.turn}
  //             />
  //           )
  //         }.bind(this))}
  //       </div>
  //     </div>
  //   );
  // }
}

export default App;
