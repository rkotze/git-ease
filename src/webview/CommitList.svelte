<script>
  import { onMount } from "svelte";

  import Commit from "./Commit.svelte";
  import { CommandNames } from "../command-names";
  import { writeLinkPatterns } from "./stores/write-link-patterns";

  let log = [];
  let remotes = [];
  onMount(() => {
    window.addEventListener("message", listenForMessages);
    return () => window.removeEventListener("message", listenForMessages);
  });

  function listenForMessages(event) {
    const message = event.data;
    if (message.command === CommandNames.GIT_REMOTES) {
      remotes = message.data;
    }

    if (message.command === CommandNames.COMMIT_LIST) {
      log = message.data;
    }

    if (message.command === CommandNames.CONFIG_LINK_PATTERNS) {
      writeLinkPatterns.write(message.data);
    }
  }
</script>

<ul>
  {#each log as commit}
    <Commit {commit} {remotes} />
  {/each}
</ul>
