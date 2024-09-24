<script>
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { onMount } from 'svelte'
  import { browser, dev } from '$app/environment'
  import Toolbar from './Toolbar.svelte'
  import { Base } from '$lib/drawing/base'
  import { Line } from '$lib/drawing/line'
  import { Path } from '$lib/drawing/path'
  import { Shape } from '$lib/drawing/shape'
  import { deserializeStack, serializeStack } from './sync'
  import { Rect } from '$lib/drawing/rect'
  import { Ellipse } from '$lib/drawing/ellipse';
  import { Eraser } from '$lib/drawing/eraser';

  const WIDTH = 350
  const HEIGHT = 350
  const STACK_SIZE = 10

  // state
  let color = '#000000'
  let base
  let cursor = 0 // position in stack
  let stack = []

  // sync
  const BASE_KEY = 'base'
  const STACK_KEY ='stack'
  const CURSOR_KEY = 'cursor'
  let yRoot

  function sync(ev) {
    if (ev.transaction.local) return

    if (ev.keysChanged.has(BASE_KEY)) {
      const data = JSON.parse(yRoot.get(BASE_KEY))
      base = Base.fromJSON(data)
      changes = true
    }

    if (ev.keysChanged.has(STACK_KEY)) {  // prefer array sync, but let's brute force this
      const data = JSON.parse(yRoot.get(STACK_KEY))
      stack.splice(0, stack.length, ...deserializeStack(data))
      changes = true
    }

    if (ev.keysChanged.has('cursor')) {
      cursor = yRoot.get(CURSOR_KEY)
      changes = true
    }
  }

  // drawing related
  const TOOL_BUILDER = {
    path: (x, y, colour) => new Path([x, y], [[x, y]], colour),
    line: (x, y, colour) => new Line([x, y], [x, y], colour),
    shape: (x, y, colour) => new Shape([x, y], [[x, y]], colour),
    rect: (x, y, colour) => new Rect([x, y], [x, y], colour),
    ellipse: (x, y, colour) => new Ellipse([x, y], [x, y], colour),
    eraser: (x, y, colour) => new Eraser([x, y], [[x, y]], colour),
  }

  let changes = true
  let tool
  let toolName = 'path'
  function drawStart(x, y) {
    const build = TOOL_BUILDER[toolName]
    if (!build) throw new Error(`No tool named ${toolName}`)
    tool = build(x, y, color)
    changes = true
  }

  function drawMove(x, y) {
    if (!tool) return
    tool.to([x, y])
    changes = true
  }

  function drawEnd() {
    if (!tool) return
    stack.splice(cursor)
    stack.push(tool)
    
    yRoot.set(STACK_KEY, JSON.stringify(serializeStack(stack)))

    if (stack.length > STACK_SIZE) {
      const frag = stack.shift()
      base.eat(frag) // yum

      // sync base
      yRoot.set(BASE_KEY, JSON.stringify(base.toJSON()))
    }
    cursor = stack.length
    yRoot.set(CURSOR_KEY, cursor)
    drawCancel()
  }

  function drawCancel() {
    tool = null
    changes = true
  }

  function draw(ctx, stack) {
    if (!changes) return requestAnimationFrame(() => draw(ctx, stack))

    // render
    ctx.reset()
    base.render(ctx)
    for (let i = 0; i < cursor; ++i) {
      stack[i].render(ctx)
    }
    tool && tool.render(ctx)
    
    changes = false
    requestAnimationFrame(() => draw(ctx, stack))
  }

  function undo() {
    cursor = Math.max(0, cursor - 1)
    yRoot.set(CURSOR_KEY, cursor)
    changes = true
  }
  function redo() {
    cursor = Math.min(stack.length, cursor + 1)
    yRoot.set(CURSOR_KEY, cursor)
    changes = true
  }

  // This translates screen coords to canvas coords -- for simplicity, they are the same
  const getXY = (e) => ([e.pageX - screenEl.offsetLeft, e.pageY - screenEl.offsetTop])

  const yDoc = new Y.Doc()
  if (browser) new WebrtcProvider('svelte5-whiteboard', yDoc)
  const yKEY = 'root'
  
  onMount(() => {
    yRoot = yDoc.get(yKEY, Y.Map)
    yRoot.observe(sync)

    base = new Base(WIDTH, HEIGHT)
    const ctx = screenEl.getContext('2d', { willReadFrequency: true })
    screenEl.addEventListener('touchstart', ev => drawStart(...getXY(ev.touches[0])))
    screenEl.addEventListener('touchmove', ev => drawMove(...getXY(ev.touches[0])))
    screenEl.addEventListener('touchend', drawEnd)
    screenEl.addEventListener('mousedown', ev => drawStart(...getXY(ev)))
    screenEl.addEventListener('mousemove', ev => drawMove(...getXY(ev)))
    screenEl.addEventListener('mouseup', drawEnd)
    screenEl.addEventListener('mouseleave', drawCancel)

    // normally you draw to a in-memory canvas, then copy to the screen with pan/zoom details
    draw(ctx, stack)
  })
</script>

<Toolbar bind:tool={toolName} bind:color={color} onundo={undo} onredo={redo} />
<canvas id="screenEl" width={WIDTH} height={HEIGHT}></canvas>

<style>
  :global(html  body) {
    margin: 0;
    overscroll-behavior: none;
  }

  #screenEl {
    display: relative;

    background-image: linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }
</style>