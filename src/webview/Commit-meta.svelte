<script>
  import dateFormat from "dateformat";

  export let date;
  export let hash;
  export let origin;
</script>

<p class="metadata">
  {#if origin}
    <a href={`${origin.url}/commit/${hash}`} class="hash">{hash.slice(0, 7)}</a>
  {:else}
    {hash.slice(0, 7)}
  {/if}
  <span class="date">{dateFormat(date, "d mmm yyyy HH:MM:ss")}</span>
</p>

<style>
  :global(.vscode-dark) .metadata {
    color: #bbb;
  }
  :global(.vscode-light) .metadata {
    color: #555;
  }

  .metadata {
    font-size: 0.9em;
    margin: 0;
    padding: 0;
  }

  .metadata .hash {
    margin-right: 8px;
    font-family: "Courier New", Courier, monospace;
  }
</style>
