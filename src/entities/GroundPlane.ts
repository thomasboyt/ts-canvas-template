import {Entity, Coordinates} from 'pearl';

import Game from '../Game';

import {
  width,
} from '../constants';

interface Settings {
  x: number;
  y: number;
}

export default class GroundPlane extends Entity<Settings> {
  center: Coordinates;
  size: Coordinates = {x: width, y: 10};

  init(settings: Settings) {
    this.center = {x: settings.x, y: settings.y};
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.fillRect(
      this.center.x - this.size.x / 2,
      this.center.y - this.size.y / 2,
      this.size.x,
      3
    );
  }
}