import { useState, useRef } from 'react';

const OTP = ({ length, onComplete }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const inputRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) {
            return;
        }

        let newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < length - 1) inputRef.current[index + 1].focus();

        if (newOtp.join('').length === length) onComplete?.(newOtp.join(''));
    };

    const handleKey = (e, index) => {
        // console.log(!otp[index]);
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const paste = e.clipboardData.getData('text').slice(0, length);

        if (!/^\d+$/.test(paste)) return;

        const newOtp = paste.split('');

        setOtp(newOtp);

        if (newOtp.length === length) {
            inputRef.current[length - 1].focus();
            onComplete?.(newOtp.join(''));
        }
    };

    return (
        <div onPaste={handlePaste}>
            {otp.map((val, i) => {
                return (
                    <input
                        key={i}
                        value={val}
                        ref={(el) => (inputRef.current[i] = el)}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKey(e, i)}
                        style={{
                            width: '2rem',
                            height: '2rem',
                            margin: '5px',
                            fontSize: '1.5rem',
                            textAlign: 'center',
                        }}
                    />
                );
            })}
        </div>
    );
};

const App = () => {
    const handleOtp = (otp) => {
        console.log('Otp logged....!!', otp);
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <h3> OTP Component </h3>
            <OTP length={4} onComplete={handleOtp} />
        </div>
    );
};

export default App;
