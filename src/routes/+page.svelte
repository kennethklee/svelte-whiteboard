<script>
  import { onMount } from 'svelte'
  import Toolbar from './Toolbar.svelte';
  import { Base } from '$lib/drawing/base';
  import { Grid } from '$lib/drawing/grid';
  import { Line } from '$lib/drawing/line';
  import { Path } from '$lib/drawing/path';
  import { Shape } from '$lib/drawing/shape';

  const width = 550
  const height = 550
  const STACK_SIZE = 10

  let grid
  let base
  let cursor = 0 // position in stack
  const stack = []
  
  // This translates screen coords to canvas coords -- for simplicity, they are the same
  const getXY = (e) => ([e.pageX - screenEl.offsetLeft, e.pageY - screenEl.offsetTop])

  onMount(() => {
    base = new Base(width, height)
    grid = new Grid(width, height)
    const ctx = screenEl.getContext('2d')
    screenEl.addEventListener('touchstart', ev => drawStart(...getXY(ev.touches[0])))
    screenEl.addEventListener('touchmove', ev => drawMove(...getXY(ev.touches[0])))
    screenEl.addEventListener('touchend', drawEnd)
    screenEl.addEventListener('mousedown', ev => drawStart(...getXY(ev)))
    screenEl.addEventListener('mousemove', ev => drawMove(...getXY(ev)))
    screenEl.addEventListener('mouseup', drawEnd)
    screenEl.addEventListener('mouseleave', drawCancel)

    // normally you draw to a in-memory canvas, then copy to the screen with pan/zoom details
    draw(ctx)
  })

  const TOOL_BUILDER = {
    path: (x, y, colour) => new Path([x, y], [[x, y]], colour),
    line: (x, y, colour) => new Line([x, y], [x, y], colour),
    shape: (x, y, colour) => new Shape([x, y], [[x, y]], colour),
  }

  let changes = true
  let tool
  let toolName = 'path'
  function drawStart(x, y) {
    const build = TOOL_BUILDER[toolName]
    if (!build) throw new Error(`No tool named ${toolName}`)
    tool = build(x, y, 'black')
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

    if (stack.length > STACK_SIZE) {
      const frag = stack.shift()
      base.eat(frag)
    }
    cursor = stack.length
    drawCancel()
  }

  function drawCancel() {
    tool = null
    changes = true
  }

  function draw(ctx) {
    if (!changes) return requestAnimationFrame(() => draw(ctx))

    // render
    ctx.reset()
    grid.render(ctx)
    base.render(ctx)
    for (let i = 0; i < cursor; ++i) {
      stack[i].render(ctx)
    }
    tool && tool.render(ctx)
    
    changes = false
    requestAnimationFrame(() => draw(ctx))
  }

  function undo() {
    cursor = Math.max(0, cursor - 1)
    changes = true
  }
  function redo() {
    cursor = Math.min(stack.length, cursor + 1)
    changes = true
  }
</script>

<Toolbar bind:tool={toolName} onundo={undo} onredo={redo} />
<canvas id="screenEl" {width} {height}></canvas>

<style>
  :global(body) {
    margin: 0;
  }

  #screenEl {
    display: relative;
  }
</style>