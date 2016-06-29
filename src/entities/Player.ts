import {Entity, Coordinates} from 'coquette';

import Game from '../Game';

interface Settings {
  x: number;
  y: number;
}

export default class Player implements Entity<Settings> {
  game: Game;
  center: Coordinates;
  size = {x: 10, y: 10};

  constructor(game: Game, settings: Settings) {
    this.game = game;
    this.center = {x: settings.x, y: settings.y};
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }

  update(dt: number) {

  }

  collision(other: Entity<any>) {

  }
}