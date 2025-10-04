import React, { useState } from 'react';
import './style.css';

const Star = ({ onClick, filled, onMouseEnter, onMouseLeave }) => {
  return (
    <span
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        color: filled ? 'gold' : 'lightgray',
        cursor: 'pointer',
        fontSize: '2rem',
        transition: 'color 0.2s ease',
      }}
    >
      ★
    </span>
  );
};

// ⭐ Controlled StarRating Component
const StarRating = ({ totalStar, value, onClick }) => {
  // internal state — component controls itself
  const [hover, setHover] = useState(0);

  const handleClick = (newValue) => {
    if (onClick) onClick(newValue);
  };

  return (
    <div>
      {[...Array(totalStar)].map((_, i) => {
        let starValue = i + 1;
        return (
          <Star
            onClick={() => handleClick(starValue)}
            filled={starValue <= (value || hover)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
};

// Parent Component using Controlled StarRating
const App = () => {
  const [rating, setRating] = useState(0);
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Star Component ⭐ </h3>
      <StarRating totalStar={5} value={rating} onClick={setRating} />
      <p>Count : {rating} </p>
    </div>
  );
};

export default App;
