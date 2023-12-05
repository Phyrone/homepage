<script lang="ts">
  import BlogImageElement from "$components/LazyImage.svelte";
  import BlogHeadingComponent from "./BlogHeadingComponent.svelte";
  import BlogCodeComponent from "./BlogCodeComponent.svelte";

  export let component: any;

  export let type: string = "";
  $: type = component.type;
</script>

{#if type === 'root' || type === 'yaml'}
  <slot />
{:else if type === 'heading'}
  <BlogHeadingComponent {component}>
    <slot />
  </BlogHeadingComponent>
{:else if type === 'paragraph'}
  <p>
    <slot />
  </p>
{:else if type === 'code'}
  <BlogCodeComponent component={component}>
    <slot />
  </BlogCodeComponent>
{:else if type === 'text'}
  {component.value}
{:else if type === 'image'}
  <div class="my-0.5 rounded-2xl overflow-hidden">
    {#if component.img_data}
      <BlogImageElement alt={component.alt} img_data={component.img_data} />
    {:else}
      <img alt={component.alt} src={component.src} />
    {/if}
  </div>
{:else if type === 'inlineCode'}
  <span class="bg-base-300/80 mx-1 px-2 rounded-sm text-current select-all">
    {component.value}
  </span>
{:else if type === 'html'}
  <!-- eslint-disable-next-line -->
  {@html component.value}
{:else}
  <p>
    {type}{'{'}
    <slot />
    {'}'}
  </p>
{/if}
