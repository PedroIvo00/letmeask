import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './services/firebase';
import './styles/global.scss';

// INDICA QUE O REACT EECUTARÁ NO ELEMENTO ROOT DO INDEX
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
