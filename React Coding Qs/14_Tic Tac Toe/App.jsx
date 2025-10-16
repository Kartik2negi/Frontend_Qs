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



// N x N size

import React, { useState } from 'react';
import './style.css';

const generatepattern = (size) => {
  const pattern = [];

  // row
  for (let r = 0; r < size; r++) {
    pattern.push([...Array(size).keys()].map((c) => r * size + c));
  }

  // column
  for (let c = 0; c < size; c++) {
    pattern.push([...Array(size).keys()].map((r) => r * size + c));
  }

  // right diagnol
  pattern.push([...Array(size).keys()].map((i) => i * size + i));

  // left diagnol
  pattern.push([...Array(size).keys()].map((i) => i * size + (size - 1 - i)));

  return pattern;
};

const getWinner = (board, patterns) => {
  for (let pattern of patterns) {
    const [first] = pattern;
    if (board[first] && pattern.every((i) => board[i] === board[first])) {
      return board[first];
    }
  }
  return null;
};

const TicTacToe1 = () => {
  const size = 3;
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const pattern = generatepattern(size);
  const winner = getWinner(board, pattern);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(size * size).fill(null));
    setIsXNext(true);
  };

  const getStatus = () => {
    if (winner) return `Player ${winner} wins! 🎉`;
    if (!board.includes(null)) return `Play draw!`;
    return `Player ${isXNext ? 'X' : 'O'} turns! `;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Tic Tac Toe</h1>
      <h2>{getStatus()}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,100px)',
          gap: '5px',
        }}
      >
        {board.map((cell, i) => (
          <button
            key={i}
            style={{ width: 100, height: 100, cursor: 'pointer', fontSize: 32 }}
            disabled={cell !== null}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        style={{
          height: 30,
          width: 70,
          margin: '20px 0',
        }}
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

const App1 = () => {
  return (
    <div>
      <TicTacToe1 />
    </div>
  );
};
