require('babel-polyfill');

import Game from './Game';

// Create canvas
window.onload = () => {
  new Game();
};