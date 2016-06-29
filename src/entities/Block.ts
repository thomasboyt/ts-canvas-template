import {Entity, Coordinates} from 'coquette';

import Game from '../Game';

interface Settings {
  x: number;
  y: number;
}

export default class Block implements Entity<Settings> {
  game: Game;
  center: Coordinates;
  size = {x: 10, y: 10};

  constructor(game: Game, settings: Settings) {
    this.game = game;
    this.center = {x: settings.x, y: settings.y};
  }

  draw(ctx: CanvasRenderingContext2D) {

  }

  update(dt: number) {

  }

  collision(other: Entity<any>) {

  }
}