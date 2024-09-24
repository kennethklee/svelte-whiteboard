<script>
  import { onMount } from "svelte";

  let { tool = $bindable('point'), color = $bindable('#000000'), onundo, onredo } = $props()

  onMount(() => {
    color = document.querySelector('input[type=color]').value
  })
</script>

<article>
  <div>
    <input type="color" bind:value={color} />
    <label><input type="radio" bind:group={tool} value="path"> point</label>
    <label><input type="radio" bind:group={tool} value="line"> line</label>
    <label><input type="radio" bind:group={tool} value="shape"> shape</label>
    <label><input type="radio" bind:group={tool} value="rect"> rect</label>
    <label><input type="radio" bind:group={tool} value="ellipse"> circle</label>
  </div>
  <vb />
  <div>
    <button onclick={onundo}>undo</button>
    <button onclick={onredo}>redo</button>
  </div>
</article>

<style>
  article {
    display: flex;
    height: 32px;
    left: calc(50% - 100px);
    line-height: 32px;

    background: white;
    border: 1px solid grey;
    box-shadow: inset 0 0 3px rgba(24, 87, 96,.5);
    font-size: 8pt;
  }

  label {
    text-transform: capitalize;
    white-space: nowrap;
  }
  input {
    vertical-align: sub;
  }
  button {
    font-size: inherit;
  }

  vb {
    display: inline-block;
    height: 100%;
    width: 1px;
    background: #aaaaaa;
    margin: 0 0.5rem;
  }
</style>