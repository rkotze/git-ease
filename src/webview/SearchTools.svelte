<script>
  import { getContext } from "svelte";
  import { CommandNames } from "../command-names";
  import ButtonIcon from "./Button-icon.svelte";
  const vscode = getContext("vscode");
  let searchText = "";
  function search(evt) {
    evt.preventDefault();
    vscode.postMessage({
      command: CommandNames.COMMIT_LIST,
      args: [searchText],
    });
  }
</script>

<form class="git-ease-search-box" on:submit={search}>
  <input
    class="git-ease-search"
    type="text"
    name="search"
    placeholder="Search commits"
    bind:value={searchText}
  />
  <ButtonIcon type="submit" iconName="search" title="Search commits" />
</form>

<style>
  .git-ease-search-box {
    display: flex;
    align-items: center;
  }
  .git-ease-search-box :global(.button) {
    padding: 0 26px 0 10px;
  }
  .git-ease-search {
    margin: 6px 0 6px 8px;
    padding: 6px;
    color: inherit;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    flex: 1 0;
  }
  :global(.vscode-dark) .git-ease-search {
    background-color: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  :global(.vscode-light) .git-ease-search {
    border: 1px solid rgba(0, 0, 0, 0.06);
    background-color: rgba(0, 0, 0, 0.04);
  }
</style>
