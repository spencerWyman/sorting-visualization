import React from 'react';
import { render } from 'react-dom';
import App from './components/app.jsx';

// uncomment so that webpack can bundle styles
// import styles from './scss/application.scss';

render(
  <App />,
  document.getElementById('app-container'))
