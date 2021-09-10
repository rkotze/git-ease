<script>
  const vscode = getContext("vscode");
  let searchText = "";
  function search(evt) {
    evt.stopPropagation();
    vscode.postMessage({
      command: CommandNames.COMMIT_LIST,
      args: [searchText],
    });
  }
</script>

<form on:submit={search}>
  <input type="text" name="search" bind:value={searchText} />
  <button type="submit">Search</button>
</form>
