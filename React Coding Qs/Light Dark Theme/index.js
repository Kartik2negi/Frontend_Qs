import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './ThemeContext';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <ThemeProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </ThemeProvider>
);
