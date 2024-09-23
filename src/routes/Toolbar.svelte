<script>
  let { tool = $bindable('point'), color = $bindable('black'), onundo, onredo } = $props()
</script>

<article>
  <div>
    <label><input type="radio" bind:group={tool} value="path"> point</label>
    <label><input type="radio" bind:group={tool} value="line"> line</label>
    <label><input type="radio" bind:group={tool} value="shape"> shape</label>
    <label><input type="radio" bind:group={tool} value="rect" disabled> rect</label>
    <label><input type="radio" bind:group={tool} value="arc" disabled> circle</label>
    <input type="color" bind:value={color} />
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
    font-size: smaller;
  }

  label {
    text-transform: capitalize;
    white-space: nowrap;
  }
  input {
    vertical-align: sub;
  }

  vb {
    display: inline-block;
    height: 100%;
    width: 1px;
    background: #aaaaaa;
    margin: 0 0.5rem;
  }
</style>