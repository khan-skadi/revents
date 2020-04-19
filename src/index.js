import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App.jsx';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(<App />, rootEl);
};

// Hook into webpack API. Use hot module replacement
if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
