import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Use the correct package
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ✅ This is the new API for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// (Optional) Keep this if needed
serviceWorker.unregister();