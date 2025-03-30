import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './ThemeContext';
import App from './App';
import './styles/global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);