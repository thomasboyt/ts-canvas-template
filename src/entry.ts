import Game from './Game';
import {
  width,
  height,
} from './constants';

// Create canvas
window.onload = () => {
  const game = new Game();

  game.run({
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
    width,
    height,
    backgroundColor: 'black'
  })
};