<script lang="ts">
</script>

<a
  class="btn-link fixed z-40 transition-all duration-500"
  class:skip-button={true}
  rel="external"
  data-sveltekit-keepfocus="false"
  href="#main-content"
>
  skip to main content
</a>

<style lang="sass">
  .skip-button
    top: 0
    left: 50%
    z-index: 100
    transform: translate(-50%, -150%)

    &:focus
      transform: translate(-50%, 0)


</style>
