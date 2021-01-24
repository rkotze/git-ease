<script>
  import Commit from "./Commit.svelte";
  let log = [];
  let remotes = [];
  window.addEventListener("message", (event) => {
    const message = event.data;
    if (message.command === "gitRemotes") {
      remotes = message.data;
    }

    if (message.command === "commitList") {
      log = message.data;
    }
  });
</script>

<ul>
  {#each log as commit}
    <Commit {commit} {remotes} />
  {/each}
</ul>
