import React, { useState } from 'react';
import './style.css';

// Tip - Create a separate TicTacToe Component and custom hook for all the logic related to game
const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const calculateWinner = (board) => {
    for (let x of winningPattern) {
        const [a, b, c] = x;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const winner = calculateWinner(board);

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const getStatus = () => {
        if (winner) return `Player ${winner} wins! 🎉🎉`;
        if (!board.includes(null)) return `Play draw!`;
        return `Player ${isXNext ? 'X' : 'O'} turn!`;
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>Tic Tac Toe</h1>
            <h3>{getStatus()}</h3>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3,100px)',
                    gap: '5px',
                }}
            >
                {board.map((cell, i) => {
                    return (
                        <button
                            key={i}
                            onClick={() => handleClick(i)}
                            style={{
                                height: '100px',
                                width: '100px',
                                fontSize: '32px',
                                cursor: 'pointer',
                            }}
                            disabled={cell !== null}
                        >
                            {cell}
                        </button>
                    );
                })}
            </div>
            <button style={{ margin: '20px 0' }} onClick={handleReset}>
                Reset
            </button>
        </div>
    );
};

export default function App() {
    return (
        <div>
            <TicTacToe />
        </div>
    );
}
