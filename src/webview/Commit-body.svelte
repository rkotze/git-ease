<script>
  import { getOrigin } from "./get-origin";
  import { linkPattern } from "./link-patterns";

  export let title;
  export let body;
  export let remotes;

  function linkIssue(text) {
    const origin = getOrigin(remotes);
    if (!origin) return text;
    return linkPattern(
      [
        {
          pattern: /(#)([0-9]+)/i,
          urlFormat: origin.url + "/issues/{1}",
          textFormat: "{0}{1}",
        },
      ],
      text
    );
  }
</script>

<p class="body">
  <strong>{title}</strong><br />
  {#each body.split("\n") as newline}
    {#if linkIssue(newline) !== newline}
      {@html linkIssue(newline)}<br />
    {:else}
      {newline}<br />
    {/if}
  {/each}
</p>
