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
    },
    eager: true,
  },
);
const files_jpeg: Record<string, string> = import.meta.glob(
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
      format: 'jpeg',
      as: 'srcset',
    },
    eager: true,
  },
);

const files_png: Record<string, string> = import.meta.glob(
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
      format: 'png',
      as: 'srcset',
    },
    eager: true,
  },
);

for (const file in files_metadata) {
  const metadata = files_metadata[file];
  const srcset_avif = files_avif[file];
  const srcset_webp = files_webp[file];
  const srcset_png = files_png[file];
  const srcset_jpeg = files_jpeg[file];
  const src_preview = files_preview[file];

  const fileName = getFileName(file);
  images[fileName] = {
    metadata,
    preview: src_preview,
    //preload avif
    preload_sets: [0],
    srcsets: [
      {
        type: 'images/avif',
        set: srcset_avif,
      },
      {
        type: 'images/webp',
        set: srcset_webp,
      },
      {
        type: 'images/jpeg',
        set: srcset_jpeg,
      },
      {
        type: 'images/png',
        set: srcset_png,
      },
    ],
  } satisfies ImageData;
}

export function getFileName(path: string, relative_from?: string): string {
  path = new URL(path, 'file://' + relative_from ?? '/').pathname;
  return base64url.encode(path);
}

export function getImageData(locator: string): ImageData | undefined {
  //console.log('getImageData', locator);
  return images[locator];
}
