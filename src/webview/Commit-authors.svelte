<script>
  export let author;
</script>

<style>
  :global(.vscode-dark) .author-list {
    color: #bbb;
  }
  :global(.vscode-light) .author-list {
    color: #555;
  }

  .author-list {
    font-size: 0.9em;
    margin-top: 2px;
  }

  .author-list p {
    margin: 0;
    padding: 0;
  }

  .author-list .name {
    margin-right: 8px;
  }
</style>

<div class="author-list">
  <p>
    Author:
    <span class="name">{author.name}</span>
    <span class="email">&lt;{author.email}&gt;</span>
  </p>
</div>
