import {Entity, Coordinates} from 'pearl';

import Game from '../Game';

interface Settings {
  x: number;
  y: number;
}

export default class Block extends Entity<Settings> {
  game: Game;
  center: Coordinates;

  // todo: is there a better way to do this?
  static size: Coordinates = {x: 10, y: 10};
  size: Coordinates = Block.size;

  init(settings: Settings) {
    this.center = {x: settings.x, y: settings.y};
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.blockManager.completed) {
      ctx.fillStyle = this.game.blockManager.completedAnimation.getColorForX(this.center.x);
    } else {
      ctx.fillStyle = 'white';
    }

    ctx.fillRect(
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
}