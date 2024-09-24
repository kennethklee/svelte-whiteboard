import { Fragment } from './fragment'

export class Ellipse extends Fragment {
  /**
   * @param {import('./fragment').Point} point
   * @param {import('./fragment').Point} toPoint
   */
  constructor(point = [0, 0], toPoint = [0, 0], colour = 'black') {
    super()
    this.point = point
    this.toPoint = toPoint
    this.colour = colour
  }

  update() {}

  /** @param {CanvasRenderingContext2D} ctx Canvas 2d context */
  render(ctx) {
    const x = Math.abs(this.point[0] + this.toPoint[0]) / 2
    const y = Math.abs(this.point[1] + this.toPoint[1]) / 2
    const w = Math.abs(this.toPoint[0] - this.point[0]) / 2
    const h = Math.abs(this.toPoint[1] - this.point[1]) / 2

    ctx.strokeStyle = this.colour
    ctx.beginPath()
    ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI)
    ctx.stroke()
  }

  to(point) {
    this.toPoint = point
  }

  toJSON() {
    return {
      type: 'ellipse',
      point: this.point,
      toPoint: this.toPoint,
      colour: this.colour
    }
  }
  static fromJSON(data) {
    return new Ellipse(data.point, data.toPoint, data.colour)
  }
}