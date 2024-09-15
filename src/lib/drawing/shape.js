import { Fragment } from './fragment'

export class Shape extends Fragment {
  /**
   * @param {import('./fragment').Point} point
   * @param {import('./fragment').Point[]} path
   */
  constructor(point = [0, 0], path = [[0, 0]], colour = 'black') {
    super()
    this.point = point
    this.path = path
  }

  update() {}

  /** @param {CanvasRenderingContext2D} ctx Canvas 2d context */
  render(ctx) {
    ctx.strokeStyle = this.colour
    ctx.moveTo(...this.point)
    for (let i = 0; i < this.path.length - 1; ++i) {
      ctx.lineTo(...this.path[i])
    }
    ctx.closePath()
    ctx.stroke()
  }

  to(point) {
    this.path.push(point)
  }
}