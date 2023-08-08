import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from "./components/ui/Footer/Footer";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

const footer = ReactDOM.createRoot(document.getElementById('footer'));
footer.render(
    <Footer />
);