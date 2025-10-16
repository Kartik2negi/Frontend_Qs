import React, { useState } from 'react';
import './style.css';

const items = [
    {
        id: '1',
        title: 'HTML',
        content: 'HTML is used for to create the stucture of a web pages.',
    },
    {
        id: '2',
        title: 'CSS',
        content: 'CSS is used for to beautify the web pages.',
    },
    {
        id: '3',
        title: 'JS',
        content: 'JS is used for to make web pages user interactive.',
    },
];

const Accordion = ({ items, variant }) => {
    const [openItem, setOpenItem] = useState(variant === 'single' ? null : []);

    const handleClick = (id) => {
        if (variant === 'single') {
            setOpenItem(openItem !== id ? id : null);
        } else {
            setOpenItem((prev) =>
                prev.includes(id) ? prev.filter((el) => el !== id) : [...openItem, id]
            );
        }
    };

    return (
        <div style={{ width: 400, margin: '10px auto' }}>
            {items.map((ele, i) => {
                return (
                    <div
                        key={ele.id}
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
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClick(ele.id)}
                        >
                            <span>{ele.title}</span>
                            <span>
                                {(
                                    variant === 'single'
                                        ? openItem === ele.id
                                        : openItem.includes(ele.id)
                                )
                                    ? '▼'
                                    : '▲'}
                            </span>
                        </div>
                        {(variant === 'single'
                            ? openItem === ele.id
                            : openItem.includes(ele.id)) && (
                                <div style={{ padding: 10 }}>{ele.content}</div>
                            )}
                    </div>
                );
            })}
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
            <h2>Accordion Support Single and Multi variant</h2>
            <Accordion items={items} variant="multi" />
        </div>
    );
}
