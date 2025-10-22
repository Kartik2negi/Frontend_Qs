import React,{ useEffect, useState } from "react";
import "./style.css";

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(3);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [won, setWon] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };

  const initializeGame = () => {
    const totalCards = gridSize * gridSize; // 16
    const pairCount = Math.floor(totalCards / 2); // 8
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const   checkMatch = (secondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      setSolved([...solved, firstId, secondId]);
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
    if (disabled || won) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        // check match logic
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "16px",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        Memory Game
      </h1>
  
      {/* Input */}
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="gridSize" style={{ marginRight: "8px" }}>
          Grid Size: (max 10)
        </label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          style={{
            borderWidth: "2px",
            borderColor: "#d1d5db",
            borderStyle: "solid",
            borderRadius: "4px",
            padding: "4px 8px",
          }}
        />
      </div>
  
      {/* Game Board */}
      <div
        style={{
          display: "grid",
          gap: "8px",
          marginBottom: "16px",
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 88}px)`,
        }}
      >
        {cards.map((card) => {
          const flipped = isFlipped(card.id);
          const solvedCard = isSolved(card.id);
  
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              style={{
                aspectRatio: "1 / 1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: flipped
                  ? solvedCard
                    ? "green"
                    : "blue"
                  : "lightgrey",
                color: flipped ? "white" : "darkgrey",
              }}
            >
              {flipped ? card.number : "?"}
            </div>
          );
        })}
      </div>
  
      {/* Result */}
      {won && (
        <div
          style={{
            marginTop: "16px",
            fontSize: "36px",
            fontWeight: "bold",
            color: "#16a34a",
            animation: "bounce 1s infinite",
          }}
        >
          You Won!
        </div>
      )}
  
      {/* Reset / Play Again Btn */}
      <button
        onClick={initializeGame}
        style={{
          marginTop: "16px",
          padding: "8px 16px",
          backgroundColor: "#22c55e",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#16a34a")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#22c55e")}
      >
        {won ? "Play Again" : "Reset"}
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
