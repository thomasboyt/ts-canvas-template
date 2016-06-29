import {Entity} from 'coquette';

interface Settings {
  x: number;
  y: number;
}

export default class Player extends Entity<Settings> {
  constructor(settings: Settings) {
    super();
    this.center = {x: settings.x, y: settings.y};
  }

  draw(ctx: CanvasRenderingContext2D) {

  }

  update(dt: number) {

  }

  collision(other: Entity<any>) {

  }
}