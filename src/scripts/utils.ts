import Hls from 'hls.js';
import type { ManifestLoadedData } from 'hls.js';
import hls_worker_url from 'hls.js/dist/hls.worker?worker&url';

export function set_hls_quality(hls: Hls, height: number, now: boolean) {
  const new_level = hls.levels.findIndex((candidate) => candidate.height === height);
  if (now) {
    hls.currentLevel = new_level;
  } else {
    hls.nextLevel = new_level;
  }
}

export async function load_hls_video(url: string): Promise<[Hls, ManifestLoadedData]> {
  const hls = new Hls({
    autoStartLoad: false,
    enableWorker: true,
    workerPath: hls_worker_url,
  });

  const manifestData: ManifestLoadedData = await new Promise((resolve, reject) => {
    hls.once(Hls.Events.MANIFEST_LOADED, (event, data) => {
      resolve(data);
    });

    hls.once(Hls.Events.ERROR, (event, data) => {
      reject(data);
    });
    hls.loadSource(url);
  });

  return [hls, manifestData];
}
