import type { ImageData, ImageMetadata } from '$scripts/types';
import base64url from 'base64url';

const images: Record<string, ImageData> = {};

const files_metadata: Record<string, ImageMetadata> = import.meta.glob(
  [
    '/**/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
    '!/build/**',
    '!/dist/**',
    '!/.svelte-kit/**',
  ],
  {
    import: 'default',
    query: {
      as: 'metadata',
    },
    eager: true,
  },
);
const files_preview: Record<string, string> = import.meta.glob(
  [
    '/**/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
    '!/build/**',
    '!/dist/**',
    '!/.svelte-kit/**',
  ],
  {
    import: 'default',
    query: {
      w: '128',
      format: 'avif',
      quality: '30',
      effort: '9',
      withoutEnlargement: true,
      inline: true,
    },
    eager: true,
  },
);
const files_avif: Record<string, string> = import.meta.glob(
  [
    '/**/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
    '!/build/**',
    '!/dist/**',
    '!/.svelte-kit/**',
  ],
  {
    import: 'default',
    query: {
      w: '256;512;1024;2048;4096',
      format: 'avif',
      as: 'srcset',
      withoutEnlargement: true,
    },
    eager: true,
  },
);
const files_webp: Record<string, string> = import.meta.glob(
  [
    '/**/*.(heic|heif|avif|jpeg|jpg|png|tiff|webp|gif)',
    '!/build/**',
    '!/dist/**',
    '!/.svelte-kit/**',
  ],
  {
    import: 'default',
    query: {
      w: '256;512;1024;2048;4096',
      format: 'webp',
      as: 'srcset',
      withoutEnlargement: true,
    },
    eager: true,
  },
);

for (const file in files_metadata) {
  const metadata = files_metadata[file];
  const fileName = getFileName(file, '/');
  images[fileName] = {
    metadata,
    preview: files_preview[file],
    //preload avif
    preload_sets: [0],
    srcsets: [
      {
        type: 'image/avif',
        set: files_avif[file],
      },
      {
        type: 'image/webp',
        set: files_webp[file],
      },
    ],
  } satisfies ImageData;
}

export function getFileName(path: string, relative_from: string): string {
  path = new URL(path, 'file://' + relative_from).pathname;
  return base64url.encode(path);
}

export function getImageData(locator: string): ImageData | undefined {
  //console.log('getImageData', locator);
  return images[locator];
}
