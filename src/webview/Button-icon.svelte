<script>
  import octicons from "@primer/octicons";
  export let iconName = "";
  export let title = "";
  let inputProps;
  $: ({ iconName, title, ...inputProps } = $$props);
</script>

<button {...inputProps} class="octicon button" {title} on:click>
  {@html octicons[iconName].toSVG()}
</button>

<style>
  :global(.octicon) {
    height: 16px;
    width: 16px;
    vertical-align: text-top;
  }

  :global(.vscode-light) button :global(.octicon) {
    fill: #222;
  }

  :global(.vscode-dark) button :global(.octicon) {
    fill: #ccc;
  }

  .button {
    padding: 0 2px;
    margin: 0 1px;
    cursor: pointer;
    display: inline-block;
    background-color: transparent;
    border: none;
  }
</style>
