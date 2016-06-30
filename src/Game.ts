import Coquette, * as Coq from 'coquette';

import {
  width,
  height,
} from './constants';

import assetCfg from './assets';
import AssetManager from './lib/AssetManager';
import AudioManager from './lib/AudioManager';

import Player from './entities/Player';
import GroundPlane from './entities/GroundPlane';
import BlockManager from './entities/BlockManager';
import UI from './entities/UI';

export default class Game implements Coq.Game {
  c: Coquette;

  assetManager: AssetManager;
  audioManager: AudioManager;

  player: Player;
  groundPlane: GroundPlane;
  blockManager: BlockManager;

  constructor() {
    this.c = new Coquette(this, 'canvas', width, height, 'black');
  }

  async init() {
    this.audioManager = new AudioManager();
    this.assetManager = new AssetManager(assetCfg, this.audioManager.ctx);

    await this.assetManager.load();

    this.audioManager.setAudioMap(this.assetManager.assets.audio);

    this.groundPlane = this.c.entities.create(GroundPlane, {x: width / 2, y: height / 2});
    const wireEdge = this.groundPlane.center.y - this.groundPlane.size.y / 2;
    this.blockManager = new BlockManager(this, { bottomEdge: wireEdge });

    this.start();

    this.c.entities.create(UI, null);
  }

  update(dt: number) {
    if (this.blockManager) {
      this.blockManager.update(dt);
    }
  }

  start() {
    this.blockManager.reset();
    this.nextStep();
  }

  nextStep() {
    const wireEdge = this.groundPlane.center.y - this.groundPlane.size.y / 2;

    this.player = this.c.entities.create(Player, {
      x: -Player.size.x / 2,
      y: wireEdge - Player.size.y / 2,
    });

    this.blockManager.addBlock();
  }

  died() {
    this.blockManager.removeBlock();
    this.finished();
  }

  finished() {
    this.c.entities.destroy(this.player);

    if (this.blockManager.completed) {
      this.start();
    }

    this.nextStep();
  }
}
