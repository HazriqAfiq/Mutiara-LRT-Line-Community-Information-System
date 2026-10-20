/**
 * main.jsx
 *
 * Application entry point.
 * Mounts the React app into the #root div in index.html.
 * Imports index.css first so global styles are applied.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
