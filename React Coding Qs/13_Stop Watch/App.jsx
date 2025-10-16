import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const Timer = () => {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimer(0);
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const getTwoDigits = (num) => String(num).padStart(2, '0');
        const hrs = getTwoDigits(Math.floor(seconds / 3600));
        const mins = getTwoDigits(Math.floor((seconds % 3600) / 60));
        const secs = getTwoDigits(seconds % 60);
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <div>
            <h4> Timer : {formatTime(timer)}</h4>
            <button
                onClick={handleStart}
                disabled={isRunning}
                style={{ margin: '4px' }}
            >
                Start
            </button>
            <button
                onClick={handleStop}
                disabled={!isRunning}
                style={{ margin: '4px' }}
            >
                Stop
            </button>
            <button onClick={handleReset} style={{ margin: '4px' }}>
                Reset
            </button>
        </div>
    );
};

const App = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h3>Stop-Watch</h3>
            <Timer />
        </div>
    );
};

export default App;
