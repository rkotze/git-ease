<script>
  import { getContext } from "svelte";
  import { CommandNames } from "../command-names";

  export let files = [];
  const vscode = getContext("vscode");

  function openFile(evt) {
    evt.stopPropagation();
    const path = evt.currentTarget.dataset.filePath;
    vscode.postMessage({
      command: CommandNames.OPEN_FILE,
      args: [path],
    });
  }
</script>

<ul class="file-list">
  {#each files as file}
    <li class="file-list-item" data-file-path={file.path} on:click={openFile}>
      <span class={`change change-${file.change}`}>{file.change}</span>&nbsp;
      {file.path}
    </li>
  {/each}
</ul>

<style>
  .file-list {
    margin-top: 4px;
    padding-top: 2px;
    border-top: 1px dashed;
  }

  .file-list-item {
    cursor: pointer;
    margin-top: 1px;
    padding: 2px 0;
  }

  .change {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 2px;
    background-color: #607d8b;
  }
  .change-M {
    background-color: #0092b2;
  }
  .change-D {
    background-color: #b9121b;
  }
  .change-A {
    background-color: #43a047;
  }

  :global(.vscode-dark) .file-list-item:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
  :global(.vscode-light) .file-list-item:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
</style>
