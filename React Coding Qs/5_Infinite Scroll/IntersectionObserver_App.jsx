import React, { useState, useEffect, useRef } from 'react';

export default function InfiniteScrollObserver() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false); // ✅ track loading synchronously

    const observerRef = useRef(null);

    const fetchData = async () => {
        if (loadingRef.current || !hasMore) return;
        loadingRef.current = true;

        setLoading(true);
        try {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=100`
            );
            const data = await res.json();

            if (data.length === 0) {
                setHasMore(false);
            } else {
                setItems((prev) => [...prev, ...data]);
                setPage((prev) => prev + 1);
            }
        } catch (e) {
            console.error('Error fetching data', e);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // core logic for scoll
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasMore && !loadingRef.current) {
                    fetchData();
                }
            },
            { threshold: 1 }
        );

        const current = observerRef.current;

        if (current) observer.observe(current);

        return () => current && observer.unobserve(current);
    }, [loading, hasMore]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>📜 Infinite Scroll using IntersectionObserver</h2>
            {items.map((item, i) => (
                <div
                    key={`${item.id}_${i}`}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        margin: '10px 0',
                        borderRadius: '8px',
                    }}
                >
                    <strong>{item.id}. </strong> {item.email}
                </div>
            ))}

            {loading && <p>Loading...</p>}
            {!hasMore && <p>✅ No more data to load</p>}

            {/* Sentinel element */}
            <div ref={observerRef} style={{ height: '10px' }}></div>
        </div>
    );
}
