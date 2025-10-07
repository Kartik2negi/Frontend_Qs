import React, { useState } from 'react';
import './style.css';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div
            style={{
                border: '1px solid gray',
                marginBottom: 8,
                borderRadius: 4,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: '#f0f0f0',
                    padding: 10,
                }}
                onClick={onClick}
            >
                <span>{title}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && <div style={{ padding: 10 }}>{content}</div>}
        </div>
    );
};

const Accordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const items = [
        { title: 'What is React?', content: 'React is a JS library for UI.' },
        { title: 'What is useState?', content: 'useState is a React Hook.' },
        { title: 'What is useEffect?', content: 'useEffect handles side effects.' },
    ];

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div style={{ width: 400, margin: '50px auto' }}>
            <h2>FA Q</h2>
            {items.map((item, i) => (
                <AccordionItem
                    key={i}
                    content={item.content}
                    title={item.title}
                    isOpen={openIndex === i}
                    onClick={() => handleClick(i)}
                />
            ))}
        </div>
    );
};

export default function App() {
    return (
        <div>
            <Accordion />
        </div>
    );
}
