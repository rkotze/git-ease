<script>
  import Commit from "./Commit.svelte";
  let log = [];
  window.addEventListener("message", (event) => {
    const message = event.data;

    if (message.command == "commitList") {
      log = message.data;
    }
  });
</script>

<ul>
  {#each log as commit}
    <Commit {commit} />
  {/each}
</ul>
