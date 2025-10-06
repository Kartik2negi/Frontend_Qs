import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // load saved theme from localStorage
    useEffect(() => {
        const getTheme = localStorage.getItem('theme');
        if (getTheme) {
            setTheme(getTheme);
        }
    }, []);

    // save to localStorage whenever theme changes
    useEffect(() => {
        localStorage.setItem('theme', 'light');
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook for easy usage
export const useTheme = () => useContext(ThemeContext);
