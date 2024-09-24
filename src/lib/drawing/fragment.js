/** @typedef {[number, number]} Point */

export class Fragment {
  /** @param {number} delta milliseconds since last frame */
  update(delta) {
    throw new Error('Not implemented')
  }

  /** @param {CanvasRenderingContext2D} ctx Canvas 2d context */
  render(ctx) {
    throw new Error('Not implemented')
  }

  /** @param {Point} point */
  to(point) {
    throw new Error('Not implemented')
  }

  /** @returns {any} */
  toJSON() {
    throw new Error('Not implemented')
  }
  /**
   * @param {any} data
   * @returns {Fragment}
   */
  static fromJSON(data) {
    throw new Error('Not implemented')
  }
}