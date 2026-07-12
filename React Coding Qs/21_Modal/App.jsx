import React, { useEffect, useRef, useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          width: '350px',
        }}
      >
        <h2>React Modal</h2>

        <p>This is a reusable modal component.</p>

        {children}

        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        padding: '50px',
        textAlign: 'center',
      }}
    >
      <h1>React Modal</h1>

      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Open Modal
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>Custom content passed as children.</p>
      </Modal>
    </div>
  );
}
