import { Fragment } from './fragment'

export class Rect extends Fragment {
  /**
   * @param {import('./fragment').Point} point
   * @param {import('./fragment').Point} path
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
    const x = Math.min(this.point[0], this.toPoint[0])
    const y = Math.min(this.point[1], this.toPoint[1])
    const w = Math.abs(this.toPoint[0] - this.point[0])
    const h = Math.abs(this.toPoint[1] - this.point[1])
    ctx.strokeStyle = this.colour
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.stroke()
  }

  to(point) {
    this.toPoint = point
  }

  toJSON() {
    return {
      type: 'rect',
      point: this.point,
      toPoint: this.toPoint,
      colour: this.colour
    }
  }
  static fromJSON(data) {
    return new Rect(data.point, data.toPoint, data.colour)
  }
}