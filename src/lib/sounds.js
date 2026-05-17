import { Howl, Howler } from 'howler'

Howler.volume(0.5)

// Using free CDN sounds
const BASE = 'https://assets.mixkit.co/active_storage/sfx'

const S = {
  hover:       new Howl({ src:[`${BASE}/2869/2869-preview.mp3`], volume:0.15, preload:true }),
  click:       new Howl({ src:[`${BASE}/1862/1862-preview.mp3`], volume:0.3,  preload:true }),
  search:      new Howl({ src:[`${BASE}/2869/2869-preview.mp3`], volume:0.25, preload:true }),
  chatSend:    new Howl({ src:[`${BASE}/1862/1862-preview.mp3`], volume:0.3,  preload:true }),
  chatReceive: new Howl({ src:[`${BASE}/2869/2869-preview.mp3`], volume:0.2,  preload:true }),
  open:        new Howl({ src:[`${BASE}/1862/1862-preview.mp3`], volume:0.2,  preload:true }),
}

let muted = false
export const setMuted = (v) => { muted = v }
export const getMuted = () => muted

export const play = (name) => {
  if (muted) return
  try { S[name]?.play() } catch {}
}
