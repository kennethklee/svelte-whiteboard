import { Fragment } from './fragment'

export class Base extends Fragment {
  canvas = document.createElement('canvas')
  width = 100
  height = 100

  constructor(w, h) {
    super()
    this.width = this.canvas.width = w || this.width
    this.height = this.canvas.height = h || this.height
    this.ctx = this.canvas.getContext('2d')
    if (!this.ctx) throw new Error('Could not get base 2d context')
  }

  render(ctx) {
    ctx.drawImage(this.canvas, 0, 0, this.width, this.height)
  }

  /** @param {Fragment} frag */
  eat(frag) {
    frag.render(this.ctx)
  }

  toJSON() {
    return {
      type: 'base',
      width: this.width,
      height: this.height,
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