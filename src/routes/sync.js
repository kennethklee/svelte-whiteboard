import { Line } from "$lib/drawing/line"
import { Path } from "$lib/drawing/path"
import { Shape } from "$lib/drawing/shape"

export function serializeStack(stack) {
  return stack.map((frag) => frag.toJSON())
}

export function deserializeFragment(data) {
  switch (data.type) {
    case 'path': return Path.fromJSON(data)
    case 'line': return Line.fromJSON(data)
    case 'shape': return Shape.fromJSON(data)
  }
  throw new Error(`Could not deserialize fragment: ${data}`)
}

export function deserializeStack(data) {
  return data.map((fragData) => deserializeFragment(fragData))
}