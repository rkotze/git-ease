<script>
  export let type = "";
</script>

<span class="badge {type}"><slot /></span>

<style>
  .badge {
    padding: 0 4px;
    border-radius: 2px;
    margin-right: 2px;
    white-space: nowrap;
    display: inline-block;
  }

  .badge.green {
    background-color: rgb(0, 110, 42);
    color: #fff;
  }

  .badge.clear {
    background-color: transparent;
    padding: 1px 0;
  }
</style>
