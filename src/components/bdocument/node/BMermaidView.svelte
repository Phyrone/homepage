<script lang="ts">
  import type { MermaidNode } from '$scripts/BDocument';

  const mermaid_import = import('mermaid')
    .then((i) => i.default);

  export let node: MermaidNode;

  function on_created(htmlDivElement: HTMLPreElement) {
    mermaid_import.then((mermaid) => {
      mermaid.init({}, htmlDivElement).then();
    });

  }
</script>

<pre use:on_created>
  {node.diagram}
</pre>