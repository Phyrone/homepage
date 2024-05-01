<script>
  import { Rss } from 'lucide-svelte';
</script>

<div class="z-0 md:sticky none right-0 bottom-0 top-0 h-fit flex flex-row md:flex-col rounded-md bg-base-200">
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
