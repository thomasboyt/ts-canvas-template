import * as Coq from 'coquette';

import Game from '../Game';

import {width, height} from '../constants';

export default class UI implements Coq.Entity {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const steps = this.game.blockManager.blocks.length;
    const max = this.game.blockManager.unfilledXValues.length + steps;

    ctx.font = '24px Monaco, Consolas, monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    ctx.fillText(`${steps} / ${max}`, width / 2, height - 25);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;

    for (let jumpX of this.game.prevJumps) {
      // draw up arrow under wireEdge
      const wireEdge = height / 2;

      ctx.beginPath();
      ctx.moveTo(jumpX - 5, wireEdge + 7);
      ctx.lineTo(jumpX, wireEdge + 2);
      ctx.lineTo(jumpX + 5, wireEdge + 7);
      ctx.stroke();
      ctx.closePath();
    }
  }
}
