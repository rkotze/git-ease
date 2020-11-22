<script>
  let log = [];
  window.addEventListener("message", (event) => {
    const message = event.data;

    switch (message.command) {
      case "commitList":
        log = message.data;
        break;
    }
  });
</script>

<div>
  {#each log as commit}
    <p>{commit.title}</p>
  {/each}
</div>
