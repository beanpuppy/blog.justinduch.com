<script>
  import { onMount } from 'svelte';

  let hasScript;

  onMount(() => {
    hasScript = true;
  });
</script>

{#if hasScript}
  <slot />
{/if}

<noscript>
  <div class="error">
    <p>This page does not work without JavaScript, sorry.</p>
    <small><a href="/post">&#9166; retour</a></small>
  </div>
</noscript>

<style>
  :global(body) {
    margin: 0 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Liberation Sans', sans-serif !important;
    color: unset !important;
    background-color: unset !important;
    font-size: 1.2rem !important;
  }

  :global(h1),
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5),
  :global(h6) {
    margin: unset !important;
    font-style: unset !important;
    letter-spacing: unset !important;
    font-weight: unset !important;
    text-transform: unset !important;
  }

  .error {
    position: relative;
    max-width: 42em;
    padding: 12em 5em 5em 5em;
    box-sizing: border-box;
  }

  @media screen and (max-width: 724px) {
    .error {
      padding: 8em 2em 2em 2em;
    }
  }
</style>
