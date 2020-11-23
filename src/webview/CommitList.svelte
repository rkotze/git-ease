<script>
  let log = [];
  window.addEventListener("message", (event) => {
    const message = event.data;

    if (message.command == "commitList") {
      log = message.data;
    }
  });
</script>

<style>
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li.commit {
    margin-top: 2px;
  }

  li.commit .title .author {
    display: inline-block;
    background-color: #151515;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 0.8em;
  }

  li.commit .author-border {
    display: inline-block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: linear-gradient(to right, red, purple);
    padding: 1px;
  }

  li.commit .hash {
    font-family: "Courier New", Courier, monospace;
  }

  li.commit .title {
    padding: 4px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  li.commit .title:hover {
    cursor: pointer;
  }

  li.commit .actions {
    padding: 4px 8px;
    flex-shrink: 0;
    margin-left: auto; /* using flex moves actions right */
    display: none;
  }

  li.commit .actions .item {
    padding: 0 2px;
    margin: 0 1px;
    cursor: pointer;
    display: inline-block;
  }

  li.commit .actions .octicon {
    fill: #ccc;
    height: 16px;
    width: 16px;
  }

  li.commit:hover .actions {
    display: block;
  }

  li.commit .action-bar-toggle {
    display: flex;
    align-items: center;
  }

  li.commit .full-commit {
    padding: 0 8px 0 16px;
    line-height: 1.4;
  }
</style>

<ul>
  {#each log as commit}
    <li class="commit">
      <div class="action-bar-toggle">
        <div class="title">
          <span class="author-border">
            <span class="author" title={commit.author}>JC</span>
          </span>
          {commit.title}
        </div>
        <div class="actions">
          <span class="octicon heart-fill item" />
          <span class="octicon bell-fill item" />
        </div>
      </div>
      <div class="full-commit">
        <p class="hash">{commit.hash}</p>
        <p class="date">{commit.date}</p>
        <p class="body">{commit.body}</p>
      </div>
    </li>
  {/each}
</ul>
