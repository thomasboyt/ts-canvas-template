import _ from 'lodash';

import Game from '../Game';
import Block from './Block';
import Timer from '../lib/Timer';

import {randInt} from '../lib/math';

interface Settings {
  bottomEdge: number;
}

// get a random item, remove it from the array, and return it, mutating the original array
function samplePop<T>(arr: T[]): T {
  if (arr.length === 0) {
    return undefined;
  }

  const idx = randInt(0, arr.length - 1);
  return arr.splice(idx, 1)[0];
}

// move the last item from the array to the front, not mutating the array
function cycle(arr: any[]) {
  return arr.slice(-1).concat(arr.slice(0, -1));
}

const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'skyblue',
  'indigo',
  'violet',
];

export default class BlockManager {
  game: Game;
  blocks: Block[] = [];

  bottomEdge: number;
  unfilledXValues: number[];

  animTimer: Timer = new Timer(25);
  animColors: string[] = colors;

  constructor(game: Game, settings: Settings) {
    this.game = game;

    this.bottomEdge = settings.bottomEdge;
  }

  reset() {
    this.blocks.forEach((block) => this.game.c.entities.destroy(block));
    this.blocks = [];
    this.unfilledXValues = _.range(150, 650, 10);
  }

  /*
   * Todo: when I'm less sleepy, figure out how to break this out into something that doesn't
   * pollute this class with animation state.
   */

  public get completed() {
    return this.unfilledXValues.length === 0;
  }

  getCompletedAnimationColorForX(x: number): string {
    // cycle colors for each x
    const colorIdx = ((x - 150) / 10) % this.animColors.length;
    return this.animColors[colorIdx];
  }

  update(dt: number) {
    this.animTimer.update(dt);

    if (this.animTimer.expired) {
      this.animColors = cycle(this.animColors);
      this.animTimer.reset();
    }
  }

  addBlock() {
    const x = samplePop(this.unfilledXValues);

    if (!x) {
      // we're out of x values to fill...
      return;
    }

    const y = this.bottomEdge - Block.size.y / 2;

    const block = this.game.c.entities.create(Block, {x, y});
    this.blocks.push(block);
  }

  removeBlock() {
    const block = this.blocks.pop();
    this.unfilledXValues.push(block.center.x);
    this.game.c.entities.destroy(block);
  }
}