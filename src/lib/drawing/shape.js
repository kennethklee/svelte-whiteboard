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
    this.colour = colour
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
    const lastPoint = this.path[this.path.length - 1]
    if (lastPoint && lastPoint[0] === point[0] && lastPoint[1] === point[1]) return
    this.path.push(point)
  }

  toJSON() {
    return {
      type: 'shape',
      point: this.point,
      path: this.path,
      colour: this.colour
    }
  }
  static fromJSON(data) {
    return new Shape(data.point, data.path, data.colour)
  }
}