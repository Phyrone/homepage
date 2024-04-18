<script lang="ts">
  import type { MermaidNode } from '$scripts/BDocument';

  const mermaid_import = import('mermaid').then((i) => i.default);

  export let node: MermaidNode;
  let rendered = false;

  function on_created(htmlDivElement: HTMLPreElement) {
    mermaid_import.then((mermaid) => {
      mermaid
        .init(
          {
            theme: 'neutral',
          },
          htmlDivElement,
        )
        .then(() => {
          rendered = true;
        });
    });
  }
</script>

<pre use:on_created class:opacity-0={!rendered}>
  {node.diagram}
</pre>
