import React from 'react';
import './style.css';
import { useTheme } from './ThemeContext';

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e',
                color: theme === 'light' ? '#000000' : '#ffffff',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h1>{theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}</h1>
            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'}
            </button>
        </div>
    );
};

export default App;
