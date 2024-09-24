<script>
  let { tool = $bindable('point'), color = $bindable('#000000'), onundo, onredo } = $props()
</script>

<article>
  <div>
    <input type="color" bind:value={color} />
    <label><input type="radio" bind:group={tool} value="path">draw</label>
    <label><input type="radio" bind:group={tool} value="line">line</label>
    <label><input type="radio" bind:group={tool} value="shape">shape</label>
    <label><input type="radio" bind:group={tool} value="rect">rect</label>
    <label><input type="radio" bind:group={tool} value="ellipse">circle</label>
  </div>
  <vb />
  <div>
    <button onclick={onundo}>↪️</button>
    <button onclick={onredo}>↩️</button>
  </div>
</article>

<style>
  article {
    display: flex;
    min-height: 32px;
    left: calc(50% - 100px);
    line-height: 32px;

    background: white;
    border: 1px solid grey;
    box-shadow: inset 0 0 3px rgba(24, 87, 96,.5);
    font-size: 8pt;
  }

  label {
    margin-right: 4px;
    text-transform: capitalize;
    white-space: nowrap;
  }
  input {
    vertical-align: sub;
  }
  input[type="radio"] {
    margin: 1px 2px 0px 1px;
  }

  button {
    font-size: inherit;
    text-orientation: sideways;
  }

  vb {
    display: inline-block;
    height: 100%;
    width: 1px;
    min-height: 32px;
    background: #aaaaaa;
    margin: 0 0.5rem;
  }
</style>