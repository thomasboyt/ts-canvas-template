import Game from '../Game';
import Block from './Block';

import {randInt} from '../math';

interface Settings {
  bottomEdge: number;
}

export default class BlockManager {
  game: Game;
  blocks: Block[];

  bottomEdge: number;

  constructor(game: Game, settings: Settings) {
    this.game = game;

    this.bottomEdge = settings.bottomEdge;

    this.blocks = [];
  }

  addBlock() {
    const x = Math.floor(randInt(150, 700) / Block.size.x) * Block.size.x;
    const y = this.bottomEdge - Block.size.y / 2;
    const block = this.game.c.entities.create(Block, {x, y});
    this.blocks.push(block);
  }

  removeBlock() {
    const block = this.blocks.pop();
    this.game.c.entities.destroy(block);
  }
}