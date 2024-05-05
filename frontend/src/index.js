import React from 'react';
import ReactDOM from 'react-dom/client';
import Init from './Init';

const root = ReactDOM.createRoot(document.getElementById('root'));
const html = document.getElementsByTagName('html');
const body = document.getElementsByTagName('body');
html[0].classList.add('h-100');
body[0].classList.add('h-100');
document.getElementById('root').classList.add('h-100');
root.render(
  <React.StrictMode>
    <Init />
  </React.StrictMode>,
);
