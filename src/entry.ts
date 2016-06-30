require('babel-polyfill');

import Game from './Game';

// Create canvas
window.onload = () => {
  const game = new Game();
  game.init();
};