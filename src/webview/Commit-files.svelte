<script>
  import { getContext } from "svelte";
  import { CommandNames } from "../command-names";
  import ButtonIcon from "./Button-icon.svelte";

  export let files = [];
  export let commitRef = "";
  const vscode = getContext("vscode");

  function openFile(evt) {
    evt.stopPropagation();
    const path = evt.currentTarget.dataset.filePath;
    vscode.postMessage({
      command: CommandNames.OPEN_FILE,
      args: [path],
    });
  }

  function openDiff(evt) {
    evt.stopPropagation();
    const path = evt.currentTarget.dataset.filePath;
    const ref = evt.currentTarget.dataset.commitRef;
    const change = evt.currentTarget.dataset.change;
    vscode.postMessage({
      command: CommandNames.OPEN_FILE_DIFF,
      args: [path, ref, change],
    });
  }
</script>

<div class="file-box">
  {#if files.length > 0}
    <span class="file-box-label">Files:</span>

    <ul class="file-list">
      {#each files as fileInfo}
        <li
          class="file-list-item"
          data-file-path={fileInfo.file.path}
          data-commit-ref={commitRef}
          data-change={fileInfo.change}
          title={fileInfo.file.path}
          on:click={openDiff}
        >
          <span class={`change change-${fileInfo.change}`}
            >{fileInfo.change}</span
          >&nbsp;
          <span class="filename">{fileInfo.file.filename}</span>
          <span class="dir">{fileInfo.file.dir}</span>
          <span class="open-file"
            ><ButtonIcon
              data-file-path={fileInfo.file.path}
              data-commit-ref={commitRef}
              iconName="file-symlink-file"
              title="Open file"
              on:click={openFile}
            /></span
          >
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  :global(.vscode-dark) .file-box-label,
  :global(.vscode-dark) .dir {
    color: #bbb;
  }
  :global(.vscode-light) .file-box-label,
  :global(.vscode-light) .dir {
    color: #555;
  }
  :global(.vscode-dark) .file-list-item:hover {
    background-color: rgba(255, 255, 255, 0.06);
  }
  :global(.vscode-light) .file-list-item:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  .file-box {
    margin-top: 4px;
    padding-top: 2px;
    border-top: 1px dashed;
  }

  .file-box-label {
    font-size: 0.9em;
  }

  .file-list-item {
    cursor: pointer;
    margin: 1px -8px 0 -16px;
    padding: 2px 8px 2px 16px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  .file-list-item .open-file {
    padding: 0;
    margin-left: auto; /* using flex moves actions right */
    display: none;
    vertical-align: baseline;
  }

  .file-list-item:hover .open-file {
    display: inline-flex;
  }

  .file-list-item .dir {
    padding: 0;
    margin-left: 6px;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 0;
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
</style>
