import { Howl } from "howler";

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;

  constructor() {
    this.loadSounds();
  }

  private loadSounds() {
    const soundFiles = {
      flip: "/sounds/flip.mp3",
      match: "/sounds/match.mp3",
      wrong: "/sounds/wrong.mp3",
      win: "/sounds/win.mp3",
    };

    Object.entries(soundFiles).forEach(([name, src]) => {
      this.sounds.set(
        name,
        new Howl({
          src: [src],
          volume: 0.5,
        }),
      );
    });
  }

  play(soundName: string) {
    if (!this.enabled) return;
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.play();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const audioManager = new AudioManager();
