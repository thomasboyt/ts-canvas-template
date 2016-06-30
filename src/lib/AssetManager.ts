import _ from 'lodash';

type AssetMap = {
  images: {
    [key:string]: HTMLImageElement;
  };
  audio: {
    [key:string]: AudioBuffer;
  };
}

interface StringMap {
  [key: string]: string;
}

type AssetCfg = {
  images: StringMap;
  audio: StringMap;
}

class AssetManager {
  assets: AssetMap;
  numTotal: number;
  numLoaded: number;
  audioCtx: AudioContext;

  _assetCfg: AssetCfg;

  constructor (assetCfg: AssetCfg, audioCtx: AudioContext) {
    this.assets = {
      'images': {},
      'audio': {},
    };

    this._assetCfg = assetCfg;

    this.audioCtx = audioCtx;

    this.numTotal = _.keys(this._assetCfg.images).length + _.keys(this._assetCfg.audio).length;
    this.numLoaded = 0;
  }

  load(): Promise<AssetMap> {
    return new Promise((resolve, reject) => {
      if (this.numTotal === 0) {
        // no assets, resolve immediately
        resolve(this.assets);
      }

      const onAssetLoaded = () => {
        this.numLoaded += 1;

        if (this.numTotal === this.numLoaded) {
          resolve(this.assets);
        }
      };

      _.each(this._assetCfg.images, (src, name) => {
        const img = new Image();
        img.onload = onAssetLoaded;
        img.src = src;

        this.assets.images[name] = img;
      });

      _.each(this._assetCfg.audio, (src, name) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = () => {
          this.audioCtx.decodeAudioData(xhr.response, (buf) => {
            this.assets.audio[name] = buf;
            onAssetLoaded();
          });
        };

        xhr.send();
      });
    });
  }

}

export default AssetManager;