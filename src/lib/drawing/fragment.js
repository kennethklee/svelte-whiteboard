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

  /** @params {Point} */
  to(point) {
    throw new Error('Not implemented')
  }

  /** @returns {string} */
  static serialize() {
    throw new Error('Not implemented')
  }
  /**
   * @param {string} data
   * @returns {Fragment}
   */
  static deserialize(data) {
    throw new Error('Not implemented')
  }
}