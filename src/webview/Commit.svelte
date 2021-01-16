<script>
  import octicons from "@primer/octicons";
  import relativeDate from "tiny-relative-date";

  import { getContext } from "svelte";
  import { parseMojis } from "./parse-mojis";

  import Badge from "./Badge.svelte";
  import CommitAuthors from "./Commit-authors.svelte";
  import CommitMeta from "./Commit-meta.svelte";

  export let commit;
  const vscode = getContext("vscode");
  let open = false;
  function toggleFullCommit() {
    open = !open;
  }

  function copyMessage() {
    const message = [commit.title, commit.body].join("\n");
    vscode.postMessage({ command: "copyCommitToInput", args: [message] });
  }
</script>

<style>
  :global(.vscode-dark) li.commit:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  :global(.vscode-dark) li.commit .title .author {
    background-color: #222;
  }
  :global(.vscode-dark) li.commit .actions :global(.octicon) {
    fill: #ccc;
  }
  :global(.vscode-light) li.commit:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  :global(.vscode-light) li.commit .title .author {
    background-color: #eee;
  }
  :global(.vscode-light) li.commit .actions :global(.octicon) {
    fill: #222;
  }

  li.commit {
    margin-top: 2px;
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    word-break: break-word;

    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
  }

  li.commit .title .author {
    display: inline-block;
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

  li.commit .title {
    padding: 4px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 70%;
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

  li.commit .actions .button {
    padding: 0 2px;
    margin: 0 1px;
    cursor: pointer;
    display: inline-block;
    background-color: transparent;
    border: none;
  }

  li.commit .actions :global(.octicon) {
    height: 16px;
    width: 16px;
    vertical-align: text-top;
  }

  li.commit:hover .actions {
    display: inline-flex;
  }

  li.commit .action-bar-toggle {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
  }

  li.commit .full-commit {
    padding: 0 8px 0 16px;
    line-height: 1.4;
    display: none;
  }

  li.commit .full-commit.open {
    display: block;
  }

  li.commit .micro-info {
    font-size: 0.6em;
    flex: 1 100%;
    margin: 0 0 0 35px;
    letter-spacing: 1px;
    line-height: 1.8em;
  }
</style>

<li class="commit">
  <div class="action-bar-toggle">
    <div class="title" on:click={toggleFullCommit}>
      <span class="author-border">
        <span
          class="author"
          title={`${commit.author.name} <${commit.author.email}>`}>{commit.author.initials}</span>
      </span>
      {parseMojis(commit.title)}
    </div>
    <div class="actions">
      <button
        class="octicon button"
        on:click={copyMessage}
        title="Copy commit message to input box">
        {@html octicons['inbox'].toSVG()}
      </button>
    </div>
    <div class="micro-info">
      <Badge type="clear">{relativeDate(commit.date)}</Badge>
      {#if commit.branch}
        <Badge type="green">{commit.branch}</Badge>
      {/if}
    </div>
  </div>

  <div class="full-commit" class:open>
    <p class="body">
      <strong>{commit.title}</strong><br />
      {@html commit.body.replace(/\n/g, '<br />')}
    </p>
    <CommitMeta date={commit.date} hash={commit.hash} />
    <CommitAuthors author={commit.author} />
  </div>
</li>
