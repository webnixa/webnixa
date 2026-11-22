function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r)
  } else {
    ctx.rect(x, y, w, h)
  }
}

/** Bright, readable Webnixa workspace for the laptop display (never black). */
export function drawWebnixaScreen(canvas: HTMLCanvasElement) {
  const w = canvas.width
  const h = canvas.height
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, '#7c3aed')
  bg.addColorStop(0.35, '#5b21b6')
  bg.addColorStop(1, '#3b1578')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 26px system-ui,sans-serif'
  ctx.fillText('Webnixa', 28, 46)

  const grad = ctx.createLinearGradient(0, 0, 200, 0)
  grad.addColorStop(0, '#EDE3FF')
  grad.addColorStop(1, '#ffffff')
  ctx.fillStyle = grad
  ctx.font = '600 12px system-ui'
  ctx.fillText('Digital workspace', 28, 68)

  const panels = [
    { x: 24, title: 'Website Dev', sub: 'Dashboard · SEO · Launch', color: '#8D4DFF' },
    { x: 220, title: 'Mobile App', sub: 'UI/UX · iOS · Android', color: '#a78bfa' },
    { x: 416, title: 'AI Automation', sub: 'Copilot · Workflows', color: '#c4b5fd' },
  ]

  panels.forEach((p) => {
    roundRect(ctx, p.x, 88, 188, 132, 14)
    ctx.fillStyle = 'rgba(255,255,255,0.18)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px system-ui'
    ctx.fillText(p.title, p.x + 16, 118)
    ctx.fillStyle = '#ede3ff'
    ctx.font = '10px system-ui'
    ctx.fillText(p.sub, p.x + 16, 138)
    roundRect(ctx, p.x + 16, 158, 156, 48, 8)
    ctx.fillStyle = p.color
    ctx.globalAlpha = 0.85
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = '#fff'
    ctx.font = '9px system-ui'
    ctx.fillText('Interface preview', p.x + 28, 186)
  })

  const baseY = h - 36
  ctx.fillStyle = 'rgba(255,255,255,0.2)'
  roundRect(ctx, 24, h - 88, w - 48, 72, 12)
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.font = '600 11px system-ui'
  ctx.fillText('Growth analytics', 40, h - 62)

  ;[36, 58, 44, 70, 52, 64, 76, 48].forEach((bar, i) => {
    ctx.fillStyle = 'rgba(255,255,255,0.85)'
    roundRect(ctx, 130 + i * 38, baseY - bar, 20, bar, 4)
    ctx.fill()
  })

  const streak = ctx.createLinearGradient(0, 0, w, h * 0.5)
  streak.addColorStop(0.2, 'rgba(255,255,255,0)')
  streak.addColorStop(0.45, 'rgba(255,255,255,0.14)')
  streak.addColorStop(0.6, 'rgba(255,255,255,0)')
  ctx.fillStyle = streak
  ctx.fillRect(0, 0, w, h)
}