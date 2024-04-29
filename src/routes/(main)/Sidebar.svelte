<script>
  import { Rss } from 'lucide-svelte';
</script>

<div class="sticky bottom-0 top-0 flex h-fit flex-col rounded-md shadow-2xl">
  <ul class="menu w-56 rounded-box bg-base-200"></ul>

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
