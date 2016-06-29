import Coquette, * as Coq from 'coquette';

import {
  width,
  height,
} from './constants';

import Block from './entities/Block';

export default class Game extends Coq.Game {
  c: Coquette;

  constructor() {
    super();
    this.c = new Coquette(this, 'canvas', width, height, 'black');

    const block = this.c.entities.create(Block, {x: 1});
  }
}