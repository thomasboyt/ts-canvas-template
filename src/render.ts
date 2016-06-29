import {
  width,
  height,
} from './constants';

import State from './state';

export default function render(ctx: CanvasRenderingContext2D, state: State) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'white';
  ctx.fillText('hello world', 100, 100);
}
