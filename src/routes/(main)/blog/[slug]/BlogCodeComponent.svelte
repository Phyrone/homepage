<script lang="ts">
  import 'highlight.js/scss/vs.scss';
  import hljs from 'highlight.js';
  import type { HighlightResult, AutoHighlightResult } from 'highlight.js';
  import { dev } from '$app/environment';

  export let component: any;

  let expected_lang: string | undefined | null;
  $: expected_lang = component.lang;

  let code: string;
  $: code = component.value;

  let highlight_lang: string;
  let hilight_lang_auto_detected: boolean;
  let highlight_illegals: boolean;

  let html: string;
  $: {
    let hl: HighlightResult | AutoHighlightResult;
    if (expected_lang) {
      try {
        hl = hljs.highlight(code, {
          language: expected_lang,
          ignoreIllegals: false,
        });
        hilight_lang_auto_detected = false;
      } catch (e) {
        hl = hljs.highlightAuto(code);
        hilight_lang_auto_detected = true;
      }
    } else {
      hl = hljs.highlightAuto(code);
      hilight_lang_auto_detected = true;
    }
    html = hl.value;
    highlight_lang = hl.language;
    highlight_illegals = hl.illegal;
  }
</script>

<div class="mockup-code my-0.5">
  {#if dev}
    <div class="hidden">{code}</div>
  {/if}
  <code
    class="px-4"
    data-code-highlight-language={highlight_lang}
    data-code-highlight-language-autodetected={hilight_lang_auto_detected}
    data-code-highlight-illegals={highlight_illegals}
  >
    {#if html}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html html}
    {:else}
      {code}
    {/if}
  </code>
</div>
