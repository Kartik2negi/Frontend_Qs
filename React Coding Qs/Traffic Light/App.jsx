import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const TrafficLight = () => {
    const [trafficColor, setTrafficColor] = useState('red');
    let timerRef = useRef(null);

    useEffect(() => {
        let delay;
        let color;

        if (trafficColor === 'red') {
            color = 'yellow';
            delay = 5000;
        } else if (trafficColor === 'yellow') {
            color = 'green';
            delay = 1000;
        } else if (trafficColor === 'green') {
            color = 'red';
            delay = 4000;
        }
        timerRef.current = setTimeout(() => {
            setTrafficColor(color);
        }, delay);

        return () => clearTimeout(timerRef.current);
    }, [trafficColor]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid black',
                width: '60px',
                margin: '2px',
                alignItems: 'center',
                borderRadius: '10px',
                backgroundColor: 'gray',
            }}
        >
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    border: '1px solid black',
                    margin: '2px',
                    borderRadius: '50%',
                    backgroundColor: trafficColor === 'red' ? 'red' : 'lightgray',
                }}
            ></div>
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    border: '1px solid black',
                    margin: '2px',
                    borderRadius: '50%',
                    backgroundColor: trafficColor === 'yellow' ? 'yellow' : 'lightgray',
                }}
            ></div>
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    border: '1px solid black',
                    margin: '2px',
                    borderRadius: '50%',
                    backgroundColor: trafficColor === 'green' ? 'green' : 'lightgray',
                }}
            ></div>
        </div>
    );
};

export default function App() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <h1>Traffic Light</h1>
            <TrafficLight />
        </div>
    );
}
