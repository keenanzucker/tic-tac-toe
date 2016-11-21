import React, { Component } from 'react';
import Scoreboard from './components/Scoreboard.js';
import ResetButton from './components/ResetButton.js'
import Tile from './components/Tile.js';
import LandingPage from './components/LandingPage.js';
import './App.css';

class App extends Component {

  // Set up state
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
      difficulty: null,
      maxPlayer: 'x',
      minPlayer: 'o'
    }
  }

  onePlayerEasy() {
    this.setState({
      numPlayers: 1,
      difficulty: 'easy'
    });
  }

  onePlayerHard() {
    this.setState({
      numPlayers: 1,
      difficulty: 'hard'
    });
  }

  twoPlayer() {
    this.setState({numPlayers: 2});
  }

  copyBoard(board) {
    return board.slice(0);
  }

  // Checks if the game has been won by either player
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

  // Checks if game is a tie
  tie(board) {
    let moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  // Checks for valid move and then adds move to gameboard
  validMove(move, player, board) {
    let newBoard = this.copyBoard(board);
    if (newBoard[move] === ' ') {
      newBoard[move] = player;
      return newBoard;
    } else {
      return null;
    }
  }

  // Smart AI will use Minimax algorithm to evaluate game states and never lose.
  findAiMoveHard(board) {
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

  // Dumb AI will just choose random tile that is not filled to move next
  findAiMoveEasy(board) {
    let possibleMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === ' ') {
        possibleMoves.push(i);
      }
    }
    return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  }

  // Min Score function of the minimax algorithm - rewards 10 for win, -10 for loss, 0 for tie
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

  // Max Score function of the minimax algorithm - rewards 10 for win, -10 for loss, 0 for tie
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

  // Game flow if a game with AI is selected
  gameLoopAI(move) {
    let player = this.state.turn;
    let curGameBoard = this.validMove(move, player, this.state.gameBoard);

    // Show the user's move
    this.setState({gameBoard: curGameBoard});

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

    // switch to the AI turn
    player = 'o';

    // if easy game, use ai easy function, if not, use ai hard function
    curGameBoard = this.validMove(((this.state.difficulty === 'easy') ? this.findAiMoveEasy(curGameBoard) : this.findAiMoveHard(curGameBoard)), player, curGameBoard);
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

    // Add a small delay to make it easier for user to understand game, AI move
    setTimeout(() => {
      this.setState({
        gameBoard: curGameBoard
      });
    }, 300);
  }

  // Game flow if a two player game is selected
  updateBoardTwoPlayer(loc) {

    // If they click a tile that already exists or game is over
    if (this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o' || this.state.winner) {
      return;
    }

    let curGameBoard = this.state.gameBoard;

    // enter x or o into board location
    curGameBoard.splice(loc, 1, this.state.turn);

    // update state to current game board
    this.setState({gameBoard: curGameBoard});

    if (this.winner(curGameBoard, this.state.turn)) {
      this.setState({
        winner: this.state.turn
      });
    }
    if (this.tie(curGameBoard)) {
      this.setState({
        winner: 'd'
      });
    }

    // change the player's turn
    this.setState({turn: (this.state.turn === 'x') ? 'o' : 'x'});
  }

  // Set the board back to the original settings
  resetBoard() {
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
          onePlayerEasy={this.onePlayerEasy.bind(this)}
          onePlayerHard={this.onePlayerHard.bind(this)}
          twoPlayer={this.twoPlayer.bind(this)}
          numPlayers={this.state.numPlayers}
        />
        <Scoreboard winner={this.state.winner}/>
        <div className="menu">
          <ResetButton reset={this.resetBoard.bind(this)} />
        </div>

        <div className="game-board container">
          {this.state.gameBoard.map(function(value, i) {
            return (
              <Tile
                key={i}
                loc={i}
                value={value}
                gameLoop={(this.state.numPlayers === 1) ? this.gameLoopAI.bind(this) : this.updateBoardTwoPlayer.bind(this)}
              />
            )
          }.bind(this))}
        </div>
      </div>
    );
  }
}

export default App;
