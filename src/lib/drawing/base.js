import { Fragment } from './fragment'

export class Base extends Fragment {
  canvas = document.createElement('canvas')
  width = 100
  height = 100

  constructor(w, h) {
    super()
    this.width = w || this.width
    this.height = h || this.height

    this.ctx = this.canvas.getContext('2d')
  }

  render(ctx) {
    ctx.drawImage(this.canvas, 0, 0, this.width, this.height)
  }

  /** @param {Fragment} frag */
  eat(frag) {
    frag.render(this.ctx)
  }
}