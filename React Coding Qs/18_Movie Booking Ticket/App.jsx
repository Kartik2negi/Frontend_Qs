import React, { useEffect, useState } from 'react';
import './style.css';

import React, { useMemo, useState } from 'react';

const ROWS = 5;
const COLS = 8;
const SEAT_PRICE = 200;

// already booked seats
const bookedSeats = new Set(['1-3', '2-5', '3-4']);

function Legend({ color, label }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: color,
          borderRadius: 4,
        }}
      />

      <span>{label}</span>
    </div>
  );
}

export default function App() {
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  // toggle seat selection
  const handleSeatClick = (seatId) => {
    // cannot select booked seats
    if (bookedSeats.has(seatId)) return;

    setSelectedSeats((prev) => {
      const next = new Set(prev);

      if (next.has(seatId)) {
        next.delete(seatId);
      } else {
        next.add(seatId);
      }

      return next;
    });
  };

  // clear all selected seats
  const handleClear = () => {
    setSelectedSeats(new Set());
  };

  // total price
  const totalPrice = useMemo(() => {
    return selectedSeats.size * SEAT_PRICE;
  }, [selectedSeats]);

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 20,
      }}
    >
      <h2>🎬 Movie Ticket Booking</h2>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 20,
          marginBottom: 20,
        }}
      >
        <Legend color="#ccc" label="Available" />
        <Legend color="green" label="Selected" />
        <Legend color="red" label="Booked" />
      </div>

      {/* Seats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 40px)`,
          gap: 10,
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        {Array.from({ length: ROWS }).map((_, rowIndex) =>
          Array.from({ length: COLS }).map((_, colIndex) => {
            const seatId = `${rowIndex + 1}-${colIndex + 1}`;

            const isBooked = bookedSeats.has(seatId);

            const isSelected = selectedSeats.has(seatId);

            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                disabled={isBooked}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 6,
                  border: '1px solid #999',
                  cursor: isBooked ? 'not-allowed' : 'pointer',
                  backgroundColor: isBooked
                    ? 'red'
                    : isSelected
                    ? 'green'
                    : '#ddd',
                }}
              >
                {colIndex + 1}
              </button>
            );
          })
        )}
      </div>

      {/* Selected Info */}
      <div>
        <h3>Selected Seats: {[...selectedSeats].join(', ') || 'None'}</h3>

        <h3>Total Price: ₹{totalPrice}</h3>

        <button onClick={handleClear}>Clear Selection</button>
      </div>
    </div>
  );
}
