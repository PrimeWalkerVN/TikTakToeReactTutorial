import React from "react";
import Square from "./Square";

const Board = (props) => {

  const { onClick, squares, winningSquares } = props;

  const renderSquare = (i) => (
    <Square isWinning={winningSquares.includes(i)} key={"square" + i} value={squares[i]} onClick={() => onClick(i)} />
  );
  const renderSquares = (n) => {
    let squares = [];
    for (let i = n; i < n + 3; i++) {
      squares.push(renderSquare(i));
    }
    return squares;
  }

  const renderRows = (i) => (
    <div className="board-row">
      {renderSquares(i)}
    </div>
  )

  return (
    <div>
      {renderRows(0)}
      {renderRows(3)}
      {renderRows(6)}
    </div>
  );
};


export default Board;
