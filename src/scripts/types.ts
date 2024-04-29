import type { BDocMetadata, BDocument } from '$scripts/BDocument';

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

export type BlogPostIdentifier = {
  year: number;
  month: number;
  day: number;
  slug: string;
};

export class RequestError extends Error {
  constructor(public response: Response) {
    super(response.statusText);
  }
}

export type DateTree<T> = Record<number, Record<number, Record<number, Record<string, T>>>>;
export type AllPosts = DateTree<BDocument>;
export type AllPostsOverview = DateTree<BDocMetadata>;