<script>
  export let type = "";
</script>

<style>
  .badge {
    padding: 1px 4px;
    border-radius: 2px;
    margin-right: 2px;
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

<span class="badge {type}"><slot /></span>
