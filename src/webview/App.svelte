<script>
  import { onMount, setContext } from "svelte";

  import { CommandNames } from "../command-names";
  import CommitList from "./CommitList.svelte";

  export let vscode;
  setContext("vscode", vscode);

  onMount(() => {
    vscode.postMessage({ command: CommandNames.PANEL_READY });
  });
</script>

<CommitList />
