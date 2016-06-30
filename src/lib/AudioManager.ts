type AudioMap = {
  [key:string]: AudioBuffer;
}

/**
 * Provides a single location for playing audio assets loaded through `AudioManager`.
 *
 * Example usage:
 *   // Will play the asset with the key of `explosion` in your assets configuration.
 *   audioManager.play('explosion');
 */
export default class AudioManager {
  ctx: AudioContext;
  audioMap: AudioMap;
  muted: boolean;
  volumeNode: GainNode;

  constructor() {
    this.ctx = new AudioContext();

    this.volumeNode = this.ctx.createGain();
    this.volumeNode.connect(this.ctx.destination);

    this.volumeNode.gain.value = 1;

    this.muted = false;
  }

  setAudioMap(audioMap: AudioMap) {
    this.audioMap = audioMap;
  }

  play(name: string) {
    const sound = this.audioMap[name];

    const src = this.ctx.createBufferSource();
    src.connect(this.volumeNode);
    src.buffer = sound;
    src.start(0);
  }

  toggleMute() {
    if (this.muted) {
      this.volumeNode.gain.value = 0.2;
    } else {
      this.volumeNode.gain.value = 0;
    }

    this.muted = !this.muted;
  }
}
