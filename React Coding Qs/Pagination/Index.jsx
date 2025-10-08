import React, { useState } from 'react';

const getPageNumbers = (totalPages, currentPage) => {
    const pages = [];

    if (totalPages <= 7) {
        // show all if few pages
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        // always show first and last pages
        if (currentPage <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(
                1,
                '...',
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
        } else {
            pages.push(
                1,
                '...',
                currentPage - 1,
                currentPage,
                currentPage + 1,
                '...',
                totalPages
            );
        }
    }

    return pages;
};

const CustomPagination = () => {
    const totalItems = 300;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumbers = getPageNumbers(totalPages, currentPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const items = Array.from({ length: totalItems }, (_, i) => `Item - ${i + 1}`);
    const currentItems = items.slice(startIndex, endIndex);

    const handlePageClick = (page) => {
        if (page === '...') return;
        setCurrentPage(page);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Custom Pagination</h1>

            {currentItems.map((item) => (
                <div key={item}>{item}</div>
            ))}

            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {pageNumbers.map((num, idx) => (
                    <button
                        key={`${num}-${idx}`}
                        onClick={() => handlePageClick(num)}
                        style={{
                            margin: '0 5px',
                            background: num === currentPage ? 'black' : 'white',
                            color: num === currentPage ? 'white' : 'black',
                        }}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default function App() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Custom Pagination</h1>

            <CustomPagination />
        </div>
    );
}
