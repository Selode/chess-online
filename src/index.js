import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Chess extends React.Component {
  constructor(props) {
    super(props);
    const matrix = [];
    for (let i = 0; i < 8; i++) {
      matrix[i] = new Array(8);
    }
    this.setUpGame(matrix);
    this.handlePiece = this.handlePiece.bind(this);
    this.state = {
      board: matrix,
      holdingPiece: false,
      heldPiece: ""
    };
  }
  setUpGame(matrix) {
    matrix[7][0] = "whiteRook";
    matrix[7][1] = "whiteKnight";
    matrix[7][2] = "whiteBishop";
    matrix[7][3] = "whiteQueen";
    matrix[7][4] = "whiteKing";
    matrix[7][5] = "whiteBishop";
    matrix[7][6] = "whiteKnight";
    matrix[7][7] = "whiteRook";
    for (let i = 0; i < 8; i++) {
      matrix[6][i] = "whitePawn";
    }
    matrix[0][0] = "blackRook";
    matrix[0][1] = "blackKnight";
    matrix[0][2] = "blackBishop";
    matrix[0][3] = "blackQueen";
    matrix[0][4] = "blackKing";
    matrix[0][5] = "blackBishop";
    matrix[0][6] = "blackKnight";
    matrix[0][7] = "blackRook";
    for (let i = 0; i < 8; i++) {
      matrix[1][i] = "blackPawn";
    }
  }

  handlePiece(i, j) {
    if (this.state.holdingPiece) {
      this.setPiece(i, j);
    } else {
      this.pickPiece(i, j);
    }
  }

  setPiece(i, j) {
    this.setState((state, props) => {
      const newBoard = state.board.slice();
      newBoard[i][j] = state.heldPiece;

      return { board: newBoard, holdingPiece: false, heldPiece: "" };
    });
  }

  pickPiece(i, j) {
    if (this.state.board[i][j]) {
      this.setState((state, props) => {
        let newPiece = state.board[i][j];
        let newBoard = state.board.slice();
        newBoard[i][j] = "";
        return { board: newBoard, holdingPiece: true, heldPiece: newPiece };
      });
    }
  }
  renderChessSquare(i, j, squareColor) {
    return (
      <ChessSquare
        className={squareColor}
        key={"" + i + j}
        piece={piecematch(this.state.board[i][j])}
        onClick={() => this.handlePiece(i, j)}
      />
    );
  }
  render() {
    const buildBoard = [];
    let squareColor = "whiteChessSquare";
    for (let i = 0; i < 8; i++) {
      var row = [];
      for (let j = 0; j < 8; j++) {
        if ((i % 2 == 0 && !(j % 2 == 0)) || (!(i % 2 == 0) && j % 2 == 0)) {
          squareColor = "blackChessSquare";
        } else {
          squareColor = "whiteChessSquare";
        }
        let cs = this.renderChessSquare(i, j, squareColor);
        row.push(cs);
      }
      buildBoard.push(<div key={"row" + i}>{row}</div>);
    }

    return (
      <div>
        <div>{buildBoard}</div>
        <ChessSquare piece={piecematch(this.state.heldPiece)} />
      </div>
    );
  }
}
class ChessSquare extends React.Component {
  render() {
    return (
      <button
        className={this.props.className}
        onClick={() => this.props.onClick()}
      >
        {this.props.piece}
      </button>
    );
  }
}

function piecematch(piece) {
  switch (piece) {
    case "whitePawn":
      return "\u2659";
    case "whiteKing":
      return "\u2654";
    case "whiteQueen":
      return "\u2655";
    case "whiteRook":
      return "\u2656";
    case "whiteKnight":
      return "\u2658";
    case "whiteBishop":
      return "\u2657";
    case "blackPawn":
      return "\u265f";
    case "blackKing":
      return "\u265A";
    case "blackQueen":
      return "\u265B";
    case "blackRook":
      return "\u265C";
    case "blackKnight":
      return "\u265E";
    case "blackBishop":
      return "\u265D";
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Chess />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
