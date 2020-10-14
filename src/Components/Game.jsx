import React from 'react';
import { useState } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

const Game = () => {
    const [stepNumber, setStepNumber] = useState(0);
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [isDescending, setIsDescending] = useState(true);


    const handleClick = (i) => {
        const locations = [
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [3, 2],
            [1, 3],
            [2, 3],
            [3, 3]
        ];
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const newSquares = current.squares.slice();
        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? "X" : "O";
        setHistory(newHistory.concat([{ squares: newSquares, location: locations[i] }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    const sortHistory = () => {
        setIsDescending(!isDescending);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
        status = "Winner: " + winner.player + " @ " + winner.line;;
    } else if (!current.squares.includes(null)) {
        status = "draw";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move + " @ " + history[move].location : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    {move === stepNumber ? <b>{desc}</b> : desc}
                </button>
            </li>);
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board winningSquares={winner ? winner.line : []} squares={current.squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button onClick={() => sortHistory()}>
                    Sort by: {isDescending ? "Descending" : "Ascending"}
                </button>
                <ol>{isDescending ? moves : moves.reverse()}</ol>
            </div>

        </div>
    );
};

export default Game;