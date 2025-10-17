import React, { useState, useEffect, useRef } from 'react';

export default function App() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false); // ✅ track loading synchronously

    const fetchComments = async () => {
        if (loadingRef.current || !hasMore) return; // block multiple calls
        loadingRef.current = true;
        setLoading(true);

        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=100`
            );
            const result = await response.json();

            if (result.length === 0) {
                setHasMore(false);
            } else {
                setData((prev) => [...prev, ...result]);
                setPage((prev) => prev + 1);
            }
        } catch (e) {
            console.error(e);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 30 &&
                !loadingRef.current &&
                hasMore
            ) {
                fetchComments();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, loading]);

    return (
        <div>
            <h1>Infinite Scroll</h1>
            {data.map((item, i) => (
                <div
                    key={`${item.id}_${i}`}
                    style={{ display: 'flex', gap: '20px' }}
                >
                    <span>{item.id}</span>
                    <span>{item.email}</span>
                </div>
            ))}
            {loading && <div>Loading....!!!!</div>}
            {!hasMore && <div>No more data....!!!!</div>}
        </div>
    );
}
