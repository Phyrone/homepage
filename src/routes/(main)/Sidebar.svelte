<script>
  import { Rss } from 'lucide-svelte';
</script>

<div
  class="none bottom-0 right-0 top-0 z-0 flex h-fit flex-row rounded-md bg-base-200 md:sticky md:flex-col"
>
  <div class="flex flex-wrap">
    <a class="btn btn-sm" href="/rss.xml">
      <Rss size={14} />
    </a>
  </div>
  <ul class="flex flex-wrap">
    <li><a class="btn btn-link" href="/impressum">Impressum</a></li>
    <li><a class="btn btn-link" href="/datenschutz">Datenschutz</a></li>
  </ul>
</div>
