import ReactDOM from 'react-dom/client';
import React from 'react';
import init from './Init.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const html = document.querySelector('html');
const body = document.querySelector('body');
html.classList.add('h-100');
body.classList.add('h-100');
document.getElementById('root').classList.add('h-100');
root.render(
  <React.StrictMode>
    {await init()}
  </React.StrictMode>,
);
