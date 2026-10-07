/**
 * Plucked-string synth — Karplus-Strong via Web Audio, no audio files.
 * Ported 1:1 from the design's `play()` so the tone matches the prototype.
 */
let ctx: AudioContext | undefined;

type AudioCtor = typeof AudioContext;

export function playPluck(freq: number): void {
  try {
    const Ctor: AudioCtor | undefined =
      window.AudioContext || (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
    if (!Ctor) return;
    const ac = ctx || (ctx = new Ctor());
    if (ac.state === 'suspended') void ac.resume();

    const sr = ac.sampleRate;
    const len = Math.floor(sr * 2.2);
    const buf = ac.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    const N = Math.max(2, Math.round(sr / freq));

    let prev = 0;
    for (let i = 0; i < N; i++) {
      prev = prev * 0.6 + (Math.random() * 2 - 1) * 0.4;
      d[i] = prev;
    }
    for (let i = N; i < len; i++) d[i] = 0.4985 * (d[i - N] + d[i - N + 1]);

    const src = ac.createBufferSource();
    src.buffer = buf;
    const lp = ac.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    const g = ac.createGain();
    g.gain.value = 0.9;
    src.connect(lp);
    lp.connect(g);
    g.connect(ac.destination);
    src.start();
  } catch {
    /* audio blocked / unsupported — stay silent like the design */
  }
}

/** Open-string frequencies of a 4-string bass: E1 A1 D2 G2. */
export const OPEN_STRINGS = [41.2, 55, 73.42, 98] as const;
