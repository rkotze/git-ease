<script>
  import { setContext } from "svelte";
  import CommitList from "./CommitList.svelte";
  export let vscode;
  setContext("vscode", vscode);
</script>

<CommitList />
