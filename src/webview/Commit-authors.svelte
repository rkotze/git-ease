<script>
  export let author;
  export let coAuthors;
</script>

<div class="author-list">
  <p>
    Author:
    <span class="name">{author.name}</span>
    <span class="email">&lt;{author.email}&gt;</span>
  </p>
  {#each coAuthors as coAuthor}
    <p>
      Co-author:
      <span class="name">{coAuthor.name}</span>
      <span class="email">&lt;{coAuthor.email}&gt;</span>
    </p>
  {/each}
</div>

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
    padding-top: 2px;
    border-top: 1px dashed;
  }

  .author-list p {
    margin: 0 0 2px 0;
    padding: 0;
  }
</style>
