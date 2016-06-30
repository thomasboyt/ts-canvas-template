import * as Coq from 'coquette';

import Game from '../Game';
import Block from './Block';
import GroundPlane from './GroundPlane';

import {rectangleIntersection} from '../math';

import {width} from '../constants';

interface Settings {
  x: number;
  y: number;
}

const gravityAccel = 1;
const speed = 10;
const jumpSpeed = 5;

export default class Player implements Coq.Entity {
  game: Game;
  center: Coq.Coordinates;

  static size = {x: 10, y: 10};
  size = Block.size;

  vec = {x: 0, y: 0};
  grounded = true;

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
    if (this.center.x - this.size.x / 2 > width) {
      this.game.finished();
      return;
    }

    const step = dt * 1/100;

    if (this.vec.y !== 0) {
      this.grounded = false;
    }

    if (this.game.c.inputter.isPressed(this.game.c.inputter['SPACE']) && this.grounded) {
      this.vec.y = -jumpSpeed;
    }

    this.vec.x = speed * step;
    this.vec.y += gravityAccel * step;

    this.center.x += this.vec.x;
    this.center.y += this.vec.y;
  }

  collision(other: Coq.Entity) {
    if (other instanceof Block) {
      const intersect = rectangleIntersection(this, other);

      if (intersect.w > intersect.h) {

        // Self is falling into a block from above
        if (intersect.fromAbove) {
          this.center.y -= intersect.h;

          if (this.vec.y > 0) {
            this.vec.y = 0;
            this.grounded = true;
          }

        // Self is rising into a block from below
        } else {
          this.center.y += intersect.h;

          if (this.vec.y < 0) {
            this.vec.y = 0;
          }
        }

      } else {
        // Self is colliding with the block from the left
        if (intersect.fromLeft) {
          this.game.died();

        // Self is colliding with the block from the right
        } else {
          this.center.x += intersect.w;
        }
      }

    } else if (other instanceof GroundPlane) {
      this.grounded = true;
      this.center.y = other.center.y - other.size.y / 2 - this.size.y / 2;
      this.vec.y = 0;

    }
  }
}