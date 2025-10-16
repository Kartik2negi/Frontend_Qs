import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    // Starts or pauses the progress
    const toggleProgress = () => {
        setIsRunning((prev) => !prev);
    };

    const handleReset = () => {
        setProgress(0);
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    // Auto increment when running
    useEffect(() => {
        if (isRunning && progress < 100) {
            intervalRef.current = setInterval(() => {
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 100);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    return (
        <div style={{ textAlign: 'center', width: '300px', margin: '40px auto' }}>
            <div
                style={{
                    width: '100%',
                    height: '25px',
                    border: '1px solid #333',
                    borderRadius: '5px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: progress == 100 ? 'green' : 'blue',
                        transition: 'width 0.1s linear',
                    }}
                ></div>
            </div>
            <p>{progress} % </p>
            <button style={{ margin: '5px' }} onClick={toggleProgress}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={handleReset}>Reset</button>
            <p>
                {progress > 0 &&
                    (progress < 100
                        ? isRunning
                            ? 'Loading...'
                            : 'Paused'
                        : 'Success ✅')}
            </p>
        </div>
    );
};

const App = () => {
    return <ProgressBar />;
};

export default App;
