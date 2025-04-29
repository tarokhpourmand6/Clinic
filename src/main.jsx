import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ مطمئن شو App.jsx همینجاست
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);