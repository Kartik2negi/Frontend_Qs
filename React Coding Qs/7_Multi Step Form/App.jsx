import React, { useState } from 'react';
import './style.css';

const Step1 = ({ formData, setFormData }) => {
    return (
        <div>
            <h3>Step 1 : Personal Info</h3>
            <input
                name="name"
                value={formData.name}
                placeholder="Enter your name"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
        </div>
    );
};

const Step2 = ({ formData, setFormData }) => {
    return (
        <div>
            <h3>Step 2 : Contact Info</h3>
            <input
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
        </div>
    );
};

const Step3 = ({ formData }) => {
    return (
        <div>
            <h3>Step 3 : Summary</h3>
            <p>Name : {formData.name}</p>
            <p>Email : {formData.email}</p>
        </div>
    );
};

const MultiStepForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [step, setStep] = useState(1);

    const nextStep = () => {
        if (step === 1 && !formData.name) return alert('Please Enter Your Name');
        if (step === 2 && !formData.email) return alert('Please Enter Your Email');

        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    const resetForm = () => {
        setFormData({ name: '', email: '' });
        setStep(1);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Multi Step Form </h1>
            {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
            {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
            {step === 3 && <Step3 formData={formData} />}

            {step > 1 && <button onClick={prevStep}>Prev</button>}
            {step < 3 && (
                <button style={{ margin: '10px' }} onClick={nextStep}>
                    Next
                </button>
            )}
            {step === 3 && (
                <button
                    style={{ margin: '10px' }}
                    onClick={() => alert('Form submitted')}
                >
                    Submit
                </button>
            )}
            {(formData.name || formData.email) && (
                <button onClick={resetForm}>Reset</button>
            )}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <MultiStepForm />
        </div>
    );
};

export default App;
