import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import "./index.css";

class ChessRenderer extends React.Component {
  render() {
    const buildBoard = [];
    let squareColor = "whiteChessSquare";
    for (let i = 0; i < 8; i++) {
      var row = [];
      for (let j = 0; j < 8; j++) {
        if (
          (i % 2 === 0 && !(j % 2 === 0)) ||
          (!(i % 2 === 0) && j % 2 === 0)
        ) {
          squareColor = "blackChessSquare";
        } else {
          squareColor = "whiteChessSquare";
        }
        let cs = (
          <ChessSquare
            className={squareColor}
            key={"" + i + j}
            piece={piecematch(this.props.board[i][j])}
            onClick={() => this.props.onClick(i, j)}
          />
        );
        row.push(cs);
      }
      buildBoard.push(<div key={"row" + i}>{row}</div>);
    }
    return (
      <div>
        <div>{buildBoard}</div>
        <ChessSquare piece={piecematch(this.props.heldPiece)} />
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
    default:
      return "";
  }
}

class Game extends React.Component {
  render() {
    return (
      <Provider store={createStore(boardReducer)}>
        <div className="game">
          <div className="game-board">
            <Chess />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      </Provider>
    );
  }
}

//Redux
// ========================================
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (i, j) => dispatch(moveAction(i, j))
  };
};
const mapStateToProps = (state, ownProps) => {
  return { board: state.board, heldPiece: state.heldPiece };
};
const Chess = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChessRenderer);

//Action Creators
function moveAction(i, j) {
  return {
    type: "MOVE",
    i: i,
    j: j
  };
}

//Reducer and SetUp
function setUpGame() {
  const matrix = [];
  for (let i = 0; i < 8; i++) {
    matrix[i] = new Array(8).fill("");
  }
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
  return { board: matrix, heldPiece: "" };
}
function boardReducer(state = setUpGame(), action) {
  var { board, heldPiece } = state;
  var { type, i, j } = action;
  if (type === "MOVE") {
    if (heldPiece === "" && board[i][j] !== "") {
      let newPiece = board[i][j];
      let newBoard = board.slice();
      newBoard[i][j] = "";
      return Object.assign({}, state, { board: newBoard, heldPiece: newPiece });
    } else if (heldPiece !== "") {
      let newBoard = board.slice();
      if (newBoard[i][j] === "blackKing" || newBoard[i][j] === "whiteKing") {
        alert("The king is dead, long live the king");
      }
      newBoard[i][j] = heldPiece;
      return Object.assign({}, state, { board: newBoard, heldPiece: "" });
    }
  }
  return state;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
