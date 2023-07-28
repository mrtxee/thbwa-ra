import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HeaderThemeSwitcher from "./components/ui/HeaderThemeSwitcher";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

const headerThemeSwitcher = ReactDOM.createRoot(document.getElementById('headerThemeSwitcher'));
headerThemeSwitcher.render(
    <HeaderThemeSwitcher />
);