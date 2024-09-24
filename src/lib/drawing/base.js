import { Fragment } from './fragment'

export class Base extends Fragment {
  canvas = document.createElement('canvas')

  constructor(w, h) {
    super()
    this.canvas.width = w
    this.canvas.height = h
    this.ctx = this.canvas.getContext('2d')
    if (!this.ctx) throw new Error('Could not get base 2d context')
  }

  /** @param {CanvasRenderingContext2D} ctx Canvas 2d context */
  render(ctx) {
    ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height)
  }

  /** @param {Fragment} frag */
  eat(frag) {
    frag.render(this.ctx)
  }

  toJSON() {
    return {
      type: 'base',
      width: this.canvas.width,
      height: this.canvas.height,
      blob: this.canvas.toDataURL('image/png'),
    }
  }
  static fromJSON(data) {
    const base = new Base(data.width, data.height)
    var img = new Image()
    img.onload = () => base.ctx.drawImage(img, 0, 0)
    img.src = data.blob
    return base
  }
}