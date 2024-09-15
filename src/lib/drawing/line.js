import { Fragment } from './fragment'

export class Line extends Fragment {
  /**
   * @param {import('./fragment').Point} point
   * @param {import('./fragment').Point} toPoint
   */
  constructor(point = [0, 0], toPoint = [0, 0], colour = 'black') {
    super()
    this.point = point
    this.toPoint = toPoint
  }

  update() {}

  /** @param {CanvasRenderingContext2D} ctx Canvas 2d context */
  render(ctx) {
    ctx.strokeStyle = this.colour
    ctx.beginPath()
    ctx.moveTo(...this.point)
    ctx.lineTo(...this.toPoint)
    ctx.stroke()
  }

  to(point) {
    this.toPoint = point
  }
}