import Coquette, * as Coq from 'coquette';

import {
  width,
  height,
} from './constants';

import Block from './entities/Block';
import Player from './entities/Player';
import GroundPlane from './entities/GroundPlane';
import BlockManager from './entities/BlockManager';

export default class Game implements Coq.Game {
  c: Coquette;

  player: Player;
  groundPlane: GroundPlane;
  blockManager: BlockManager;

  constructor() {
    this.c = new Coquette(this, 'canvas', width, height, 'black');

    this.groundPlane = this.c.entities.create(GroundPlane, {x: width / 2, y: height / 2});

    const wireEdge = this.groundPlane.center.y - this.groundPlane.size.y / 2;
    this.blockManager = new BlockManager(this, { bottomEdge: wireEdge });

    this.start();
  }

  start() {
    const wireEdge = this.groundPlane.center.y - this.groundPlane.size.y / 2;

    this.player = this.c.entities.create(Player, {
      x: -Player.size.x / 2,
      y: wireEdge - Player.size.y / 2
    });

    this.blockManager.addBlock();
  }

  died() {
    this.blockManager.removeBlock();
    this.finished();
  }

  finished() {
    this.c.entities.destroy(this.player);

    this.start();
  }
}
