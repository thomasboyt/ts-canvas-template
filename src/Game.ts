import * as Pearl from 'Pearl';

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

export default class Game extends Pearl.Game {
  assetManager: AssetManager;
  audioManager: AudioManager;

  player: Player;
  groundPlane: GroundPlane;
  blockManager: BlockManager;

  prevJumps: number[] = [];
  curJumps: number[] = [];

  init() {
    this.async.schedule(this._coInit.bind(this));
  }

  *_coInit() {
    this.audioManager = new AudioManager();
    this.assetManager = new AssetManager(assetCfg, this.audioManager.ctx);

    yield this.assetManager.load();

    this.audioManager.setAudioMap(this.assetManager.assets.audio);

    this.groundPlane = this.entities.add(new GroundPlane(), {x: width / 2, y: height / 2});
    const wireEdge = this.groundPlane.center.y - this.groundPlane.size.y / 2;
    this.blockManager = new BlockManager(this, { bottomEdge: wireEdge });

    this.start();

    this.entities.add(new UI(), null);

    // to test the animation:
    // for (let i = 0; i < 50; i++) {
    //   this.blockManager.addBlock();
    // }
  }

  start() {
    this.blockManager.reset();
    this.nextStep();
  }

  reachedEnd() {
    this.audioManager.play('wah');

    this.prevJumps = this.curJumps;

    this.finishedStep();
  }

  died() {
    this.blockManager.removeBlock();
    this.finishedStep();
  }

  private finishedStep() {
    this.curJumps = [];

    this.entities.destroy(this.player);

    if (this.blockManager.completed) {
      this.start();
    }

    this.nextStep();
  }

  private nextStep() {
    const wireEdge = this.groundPlane.center.y - this.groundPlane.size.y / 2;

    this.player = this.entities.add(new Player(), {
      x: -Player.size.x / 2,
      y: wireEdge - Player.size.y / 2,
    });

    this.blockManager.addBlock();
  }

}
