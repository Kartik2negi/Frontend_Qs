import React, { useState, useEffect } from 'react';
import './style.css';

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(2);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  // max move
  const [maxMove, setMaxMove] = useState(0);
  const [trackMove, setTrackMove] = useState(0);

  const handleGridChange = (e) => {
    const size = parseInt(e.target.value);

    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  const initializeGame = () => {
    const totals = gridSize * gridSize; // 3*3 = 9;
    const pairCount = Math.floor(totals / 2); // 4
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);

    const shuffleCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totals)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffleCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setWon(false);
    setMaxMove(0);
    setTrackMove(0);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const match = (secondId) => {
    const [firstId] = flipped;

    if (cards[firstId].number === cards[secondId].number) {
      setSolved((prev) => [...prev, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const handleClick = (id) => {
    if (won || disabled || (maxMove > 0 && trackMove === maxMove)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      // increase move count
      setTrackMove((prev) => prev + 1);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      // increase move count
      setTrackMove((prev) => prev + 1);

      if (id !== flipped[0]) {
        setFlipped((prev) => [...prev, id]);
        //check match
        match(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (cards.length === solved.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved]);

  const handleMaxMoveChange = (e) => {
    const maxmoves = parseInt(e.target.value);

    setMaxMove(maxmoves);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Memory Game</h2>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="inputgrid">Grid Size (max 10)</label>
        <input
          id="inputgrid"
          type="number"
          max={10}
          min={2}
          onChange={handleGridChange}
          value={gridSize}
          style={{
            padding: '2px',
            margin: '5px',
            border: '1px solid black',
          }}
        />
      </div>

      {/* Max move */}

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="inputmax">Max move (0 for unlimited)</label>
        <input
          id="inputmax"
          type="number"
          max={10}
          min={0}
          onChange={handleMaxMoveChange}
          value={maxMove}
          style={{
            padding: '2px',
            margin: '5px',
            border: '1px solid black',
          }}
        />
      </div>

      {/* Max move count */}

      <div style={{ marginBottom: '10px' }}>
        Moves:{' '}
        {`${maxMove === 0 ? 'Unlimited moves' : ` ${trackMove}/${maxMove}`}`}
      </div>

      {/* Card Board */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize},minmax(0, 1fr))`,
          gap: '8px',
          width: `min(100% , ${gridSize * 88}px)`,
        }}
      >
        {cards.map((card, i) => {
          return (
            <div
              onClick={() => handleClick(card.id)}
              style={{
                aspectRatio: '1/1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: isFlipped(card.id)
                  ? isSolved(card.id)
                    ? 'green'
                    : 'blue'
                  : 'lightgrey',
              }}
            >
              {isFlipped(card.id) ? card.number : '?'}
            </div>
          );
        })}
      </div>

      {/* Won */}

      {won && (
        <div
          style={{
            marginTop: '16px',
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#16a34a',
            animation: 'bounce 1s infinite',
          }}
        >
          You won!!
        </div>
      )}

      {/* Loss - Max move */}

      {maxMove > 0 && trackMove === maxMove && (
        <div
          style={{
            marginTop: '16px',
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#16a34a',
            animation: 'bounce 1s infinite',
          }}
        >
          Game Over!!
        </div>
      )}

      {/* Reset */}
      <button style={{ marginTop: '40px' }} onClick={initializeGame}>
        {won ? 'Play Again' : 'Reset'}
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <MemoryGame />
    </div>
  );
}
