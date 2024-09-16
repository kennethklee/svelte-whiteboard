import { Fragment } from './fragment'

export class Grid extends Fragment {
  canvas = document.createElement('canvas')
  width = 100
  height = 100

  constructor(w, h) {
    super()
    this.width = w || this.width
    this.height = h || this.height

    // grid canvas
    this.canvas.width = 50
    this.canvas.height = 50

    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get grid 2d context')

    ctx.fillStyle = '#ddd'
    ctx.beginPath()
    ctx.rect(25, 0, 25, 25)
    ctx.rect(0, 25, 25, 25)
    ctx.fill()
  }

  /** @param {CanvasRenderingContext2D} ctx Canvas 2d context */
  render(ctx) {
    const pattern = ctx.createPattern(this.canvas, 'repeat')
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, this.width, this.height)
  }
}