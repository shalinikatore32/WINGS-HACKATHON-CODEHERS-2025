import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EventProvider } from './context/EventProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </React.StrictMode>
);


