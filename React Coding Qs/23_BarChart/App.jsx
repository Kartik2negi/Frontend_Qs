import React, { memo, useMemo } from 'react';

const data = [
    { id: 1, label: 'Jan', value: 30 },
    { id: 2, label: 'Feb', value: 80 },
    { id: 3, label: 'Mar', value: 45 },
    { id: 4, label: 'Apr', value: 60 },
    { id: 5, label: 'May', value: 20 },
    { id: 6, label: 'Jun', value: 95 },
    { id: 7, label: 'Jul', value: 50 },
];

const Bar = memo(({ label, value, height }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
                height: '100%',
            }}
        >
            <span
                style={{
                    marginBottom: 8,
                    fontWeight: 'bold',
                    fontSize: 14,
                }}
            >
                {value}
            </span>

            <div
                style={{
                    width: 40,
                    height,
                    background: '#3b82f6',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 300ms ease',
                    cursor: 'pointer',
                }}
                onClick={() => alert(`${label} : ${value}`)}
            />

            <span
                style={{
                    marginTop: 10,
                    fontWeight: 600,
                }}
            >
                {label}
            </span>
        </div>
    );
});

function BarChart({ data, chartHeight = 300 }) {
    const normalizedData = useMemo(() => {
        const maxValue = Math.max(...data.map((item) => item.value));

        return data.map((item) => ({
            ...item,
            height: (item.value / maxValue) * chartHeight,
        }));
    }, [data, chartHeight]);

    return (
        <div
            style={{
                width: '100%',
                maxWidth: 900,
                margin: '40px auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                    height: chartHeight,
                    borderLeft: '2px solid #444',
                    borderBottom: '2px solid #444',
                    padding: '20px',
                    gap: 20,
                }}
            >
                {normalizedData.map((item) => (
                    <Bar
                        key={item.id}
                        label={item.label}
                        value={item.value}
                        height={item.height}
                    />
                ))}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div
            style={{
                padding: 40,
                fontFamily: 'Arial',
            }}
        >
            <h2
                style={{
                    textAlign: 'center',
                }}
            >
                React Bar Chart
            </h2>

            <BarChart data={data} chartHeight={350} />
        </div>
    );
}
