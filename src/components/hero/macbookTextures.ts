import * as THREE from 'three'
import { drawWebnixaScreen } from './webnixaScreenCanvas'

function drawKeyboard(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height

  const deck = ctx.createLinearGradient(0, 0, w, h)
  deck.addColorStop(0, '#5c626c')
  deck.addColorStop(1, '#4a5058')
  ctx.fillStyle = deck
  ctx.fillRect(0, 0, w, h)

  const cols = 15
  const rows = 5
  const padX = 14
  const padY = 12
  const gap = 4
  const keyW = (w - padX * 2 - gap * (cols - 1)) / cols
  const keyH = (h * 0.62 - padY - gap * (rows - 1)) / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = padX + c * (keyW + gap)
      const y = padY + r * (keyH + gap)
      const grad = ctx.createLinearGradient(x, y, x, y + keyH)
      grad.addColorStop(0, '#3a3f46')
      grad.addColorStop(1, '#24282e')
      ctx.fillStyle = grad
      ctx.beginPath()
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, keyW, keyH, 3)
      } else {
        ctx.rect(x, y, keyW, keyH)
      }
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.stroke()
    }
  }

  const tw = w * 0.42
  const th = h * 0.2
  const ty = h - th - 14
  ctx.fillStyle = '#353b42'
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(w / 2 - tw / 2, ty, tw, th, 6)
  } else {
    ctx.rect(w / 2 - tw / 2, ty, tw, th)
  }
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.stroke()
}

function drawGlassSheen(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const w = canvas.width
  const h = canvas.height
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0.1, 'rgba(255,255,255,0)')
  g.addColorStop(0.38, 'rgba(255,255,255,0.18)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.04)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

export function createMacBookTextures() {
  const screenCanvas = document.createElement('canvas')
  screenCanvas.width = 768
  screenCanvas.height = 480
  drawWebnixaScreen(screenCanvas)

  const sheenCanvas = document.createElement('canvas')
  sheenCanvas.width = 512
  sheenCanvas.height = 320
  drawGlassSheen(sheenCanvas)

  const keyboardCanvas = document.createElement('canvas')
  keyboardCanvas.width = 512
  keyboardCanvas.height = 320
  drawKeyboard(keyboardCanvas)

  const screen = new THREE.CanvasTexture(screenCanvas)
  screen.colorSpace = THREE.SRGBColorSpace
  screen.anisotropy = 4

  const sheen = new THREE.CanvasTexture(sheenCanvas)
  sheen.colorSpace = THREE.SRGBColorSpace

  const keyboard = new THREE.CanvasTexture(keyboardCanvas)
  keyboard.colorSpace = THREE.SRGBColorSpace

  return {
    screen,
    sheen,
    keyboard,
    dispose: () => {
      screen.dispose()
      sheen.dispose()
      keyboard.dispose()
    },
  }
}