<script>
  import { getOrigin } from "./get-origin";
  import { linkPattern } from "./link-patterns";
  import { writeLinkPatterns } from "./stores/write-link-patterns";

  export let title;
  export let body;
  export let remotes;

  let patterns = $writeLinkPatterns;

  const origin = getOrigin(remotes);
  if (origin) {
    patterns.push({
      pattern: /(#)([0-9]+)/i,
      urlFormat: origin.url + "/issues/{1}",
      textFormat: "{0}{1}",
    });
  }

  function linkIssue(text) {
    return linkPattern(patterns, text);
  }
</script>

<div class="body">
  <p>
    <strong
      >{#if linkIssue(title) !== title}
        {@html linkIssue(title)}
      {:else}
        {title}
      {/if}</strong
    >
  </p>
  {#each body.split("\n") as newline}
    {#if linkIssue(newline) !== newline}
      {@html linkIssue(newline)}<br />
    {:else}
      {newline}<br />
    {/if}
  {/each}
</div>
