import React, { useState, useEffect, useRef } from 'react';

const images = [
    'https://image-processor-storage.s3.us-west-2.amazonaws.com/images/281c2d4581ed27c8a258b0e79bc504ad/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg',
    'https://picsum.photos/200/300',
    'https://picsum.photos/seed/picsum/200/300',
];

const App = () => {
    const [index, setIndex] = useState(0);
    const [isPause, setIsPause] = useState(false);
    const intervalRef = useRef(null);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (!isPause) {
            intervalRef.current = setInterval(nextSlide, 2000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isPause]);

    // Control for key press
    useEffect(() => {
        const handlekey = (e) => {
            if (e.key == 'ArrowRight') nextSlide();
            if (e.key == 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handlekey);

        return () => window.removeEventListener('keydown', handlekey);
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <button onClick={prevSlide}>{'<<'}</button>
            <img
                alt="Carousel"
                src={images[index]}
                style={{ width: '250px', height: '250px' }}
                onMouseEnter={() => setIsPause(true)} // to pause the autochange
                onMouseLeave={() => setIsPause(false)} // to resume the autochange
            />
            <button onClick={nextSlide}>{'>>'}</button>
            <div>
                {images.map((_, i) => (
                    <span
                        key={`${i}-image`}
                        onClick={() => setIndex(i)}
                        style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: index == i ? 'gold' : 'lightgray',
                            margin: '0 5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default App;
