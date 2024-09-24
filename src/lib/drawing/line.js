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
    this.colour = colour
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

  /** @param {import('./fragment').Point} point */
  to(point) {
    this.toPoint = point
  }

  toJSON() {
    return {
      type: 'line',
      point: this.point,
      toPoint: this.toPoint,
      colour: this.colour
    }
  }
  static fromJSON(data) {
    return new Line(data.point, data.toPoint, data.colour)
  }
}