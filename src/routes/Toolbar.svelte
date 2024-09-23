<script>
  let { tool = $bindable('point'), color = $bindable('black'), onundo, onredo } = $props()
</script>

<article>
  <label><input type="radio" bind:group={tool} value="path"> point</label>
  <label><input type="radio" bind:group={tool} value="line"> line</label>
  <label><input type="radio" bind:group={tool} value="shape"> shape</label>
  <label><input type="radio" bind:group={tool} value="rect" disabled> rect</label>
  <label><input type="radio" bind:group={tool} value="arc" disabled> circle</label>
  <vb />
  <button onclick={onundo}>undo</button>
  <button onclick={onredo}>redo</button>
  <br />

  <!-- <input type="color" bind:value={color} /> -->
</article>

<style>
  article {
    /* position: absolute; */
    display: flex;
    height: 48px;
    left: calc(50% - 100px);
    /* bottom: 0; */

    background: white;

    border: 1px solid grey;
    box-shadow: inset 0 0 3px rgba(24, 87, 96,.5);
  }

  label {
    text-transform: capitalize;
    white-space: nowrap;
  }

  vb {
    display: inline-block;
    height: 100%;
    width: 1px;
    background: #aaaaaa;
    margin: 0 0.5rem;
  }
</style>