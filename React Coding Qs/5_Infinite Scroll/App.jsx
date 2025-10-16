import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
    const [count, setCount] = useState(50);

    useEffect(() => {
        const scroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 30
            ) {
                setCount((prev) => prev + 1);
            }
        };

        window.addEventListener('scroll', scroll);

        return () => window.removeEventListener('scroll', scroll);
    }, []);

    let element = [];

    for (let i = 0; i < count; i++) {
        element.push(<div key={i}>{i + 1}</div>);
    }

    return <div>{element}</div>;
}
