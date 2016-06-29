import Coquette, * as Coq from 'coquette';

import {
  width,
  height,
} from './constants';

import Block from './entities/Block';
import Player from './entities/Player';

export default class Game implements Coq.Game {
  c: Coquette;

  constructor() {
    this.c = new Coquette(this, 'canvas', width, height, 'black');

    const player = this.c.entities.create(Player, {x: 100, y: 100});
  }
}