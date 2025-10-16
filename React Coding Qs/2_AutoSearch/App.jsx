import React, { useState } from 'react';
import './style.css';

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

const Autocomplete = () => {
    const [input, setInput] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [showList, setShowList] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);

        if (value.trim() === '') {
            setFiltered([]);
            setShowList(false);
            return;
        }

        const matches = fruits.filter((item) => {
            return item.toLowerCase().includes(value.toLowerCase());
        });

        setFiltered(matches);
        setShowList(true);
    };

    const handleSelect = (value) => {
        setInput(value);
        setShowList(false);
    };

    return (
        <div style={{ textAlign: 'left', width: '250px', margin: '50px auto' }}>
            <input
                onChange={handleChange}
                style={{
                    borderRadius: '4px',
                    width: '100%',
                    padding: '8px',
                    border: '1px solid gray',
                }}
                value={input}
                placeholder="Search fruit....."
            />

            {showList && filtered.length > 0 && (
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: '5px',
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        borderRadius: '0 0 4px 4px',
                        background: 'white',
                        position: 'absolute',
                        width: '230px',
                    }}
                >
                    {filtered.map((item, i) => {
                        return (
                            <li
                                key={i}
                                style={{ padding: '6px', cursor: 'pointer' }}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={(e) =>
                                    (e.target.style.backgroundColor = '#f0f0f0')
                                }
                                onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            )}
            {showList && filtered.length === 0 && (
                <div
                    style={{
                        padding: '6px',
                        border: '1px solid #cc',
                        borderRadius: '0 0 4px 4px',
                        background: '#fff',
                    }}
                >
                    No result found...!!
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
