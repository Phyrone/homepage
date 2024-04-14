export type ImageData = {
  metadata: ImageMetadata;
  preview: string;
  preload_sets: number[];
  srcsets: Srcset[];
};

export type ImageMetadata = {
  format: string;
  width: number;
  height: number;
  space: string;
  channels: number;
  depth: string;
  density: number;
  isProgressive: boolean;
  hasProfile: boolean;
  hasAlpha: boolean;
  src: string;
};

export type Srcset = {
  type: string;
  set: string;
};

export type FetchFunction = typeof fetch;
