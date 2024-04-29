<script>
  import { Rss } from 'lucide-svelte';
</script>

<div class="rounded-md shadow-2xl flex flex-col h-fit sticky bottom-0 top-0">
  <ul class="menu bg-base-200 w-56 rounded-box">


  </ul>

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