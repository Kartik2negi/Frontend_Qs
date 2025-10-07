import React, { useState } from 'react';
import './style.css';

const Pagination = ({ totalPage, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>
            {pages.map((page, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(page)}
                    style={{
                        fontWeight: currentPage === page ? 'bold' : ' normal',
                        background: currentPage === page ? 'lightgrey' : 'white',
                    }}
                >
                    {page}
                </button>
            ))}
            <button
                disabled={currentPage === totalPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

const App = () => {
    const ITEMS = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
    const [currentPage, setCurrentPage] = useState(1);
    const perPageNo = 10;
    const totalPage = ITEMS.length / perPageNo;

    const startIndex = (currentPage - 1) * perPageNo;
    const currentItems = ITEMS.slice(startIndex, startIndex + perPageNo);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Custom Pagination </h2>

            <ul style={{ listStyle: 'none', padding: 0, fontSize: 20 }}>
                {currentItems.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
            <Pagination
                totalPage={totalPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default App;
