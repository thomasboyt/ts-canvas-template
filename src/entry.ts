require('babel-polyfill');

// import qs from 'query-string';

import {
  width,
  height,
} from './constants';

import Game from './Game';

// Create canvas
window.onload = () => {
  new Game();
};