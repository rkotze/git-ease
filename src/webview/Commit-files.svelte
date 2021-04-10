<script>
  export let files = [];
</script>

<ul>
  {#each files as file}
    <li>
      {file.change}&nbsp;
      {file.path}
    </li>
  {/each}
</ul>
