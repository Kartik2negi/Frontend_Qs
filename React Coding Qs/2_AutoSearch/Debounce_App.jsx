import React, { useState, useRef, useEffect } from 'react';
import './style.css';

// first way - with hook
const fruits = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cherry',
  'Mango',
  'Orange',
  'Pineapple',
  'Strawberry',
];

const useDebounce = (value, delay) => {
  const [debounceVal, setDebounceVal] = useState('');

  useEffect(() => {
    const abc = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => clearTimeout(abc);
  }, [value]);

  return debounceVal;
};

const Autocomplete = () => {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState([]);
  const [showList, setShowList] = useState(false);

  const debounceInput = useDebounce(input, 500);

  useEffect(() => {
    if (debounceInput.trim() === '') {
      setFilter([]);
      setShowList(false);
      return;
    }

    const match = fruits.filter((el, i) =>
      el.toLowerCase().includes(input.toLowerCase())
    );

    setFilter(match);
    setShowList(true);
  }, [debounceInput]);

  const handleSelect = (val) => {
    setInput(val);
    setShowList(false);
  };

  return (
    <div style={{ textAlign: 'left', width: 250, margin: '50px auto' }}>
      <input
        value={input}
        // onChange={(e) => handleChange(e)}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for fruit..."
        style={{
          borderRadius: '4px',
          width: '100%',
          padding: 8,
          border: '1px solid gray',
        }}
      />

      {showList && filter.length > 0 && (
        <ul
          style={{
            margin: 0,
            padding: 5,
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            width: '230px',
            background: 'white',
            position: 'absolute',
            listStyle: 'none',
          }}
        >
          {filter.map((el, i) => (
            <li
              key={i}
              style={{ padding: 6, cursor: 'pointer' }}
              onClick={() => handleSelect(el)}
              onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
              onMouseLeave={(e) => (e.target.style.background = 'white')}
            >
              {el}
            </li>
          ))}
        </ul>
      )}

      {showList && filter.length === 0 && (
        <div
          style={{
            marginTop: '10px',
            padding: '6px',
            border: '1px solid #cc',
            borderRadius: '0 0 4px 4px',
            background: '#fff',
          }}
        >
          No Result Found..!!
        </div>
      )}
    </div>
  );
};

// Parent Component using Controlled StarRating
const App = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>AutoComplete Component ⭐ </h3>
      <Autocomplete />
    </div>
  );
};

export default App;


// Second way - without hook

const Autocomplete2 = () => {
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState([]);
  const [showList, setShowList] = useState(false);

  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.trim() === '') {
        setFilter([]);
        setShowList(false);
        return;
      }

      const match = fruits.filter((el, i) =>
        el.toLowerCase().includes(value.toLowerCase())
      );
      setFilter(match);
      setShowList(true);
    }, 500);
  };

  const handleSelect = (val) => {
    setInput(val);
    setShowList(false);
  };

  return (
    <div style={{ textAlign: 'left', width: 250, margin: '50px auto' }}>
      <input
        value={input}
        onChange={(e) => handleChange(e)}
        placeholder="Search for fruit..."
        style={{
          borderRadius: '4px',
          width: '100%',
          padding: 8,
          border: '1px solid gray',
        }}
      />

      {showList && filter.length > 0 && (
        <ul
          style={{
            margin: 0,
            padding: 5,
            border: '1px solid #ccc',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            width: '230px',
            background: 'white',
            position: 'absolute',
            listStyle: 'none',
          }}
        >
          {filter.map((el, i) => (
            <li
              key={i}
              style={{ padding: 6, cursor: 'pointer' }}
              onClick={() => handleSelect(el)}
              onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
              onMouseLeave={(e) => (e.target.style.background = 'white')}
            >
              {el}
            </li>
          ))}
        </ul>
      )}

      {showList && filter.length === 0 && (
        <div
          style={{
            marginTop: '10px',
            padding: '6px',
            border: '1px solid #cc',
            borderRadius: '0 0 4px 4px',
            background: '#fff',
          }}
        >
          No Result Found..!!
        </div>
      )}
    </div>
  );
};

// Parent Component using Controlled StarRating
const App2 = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>AutoComplete Component ⭐ </h3>
      <Autocomplete2 />
    </div>
  );
};

