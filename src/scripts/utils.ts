import { createCodec } from 'msgpack-lite';
import type { DateTree } from '$scripts/types';

export const mp_codec = createCodec({
  int64: true,
  uint8array: true,
  safe: true,
  usemap: false,
  preset: true,
  binarraybuffer: true,
});

export const blog_data_headers = {
  'Cache-Control': 'public, max-age=3600',
  'Content-Type': 'application/octet-stream',
  Vary: 'Accept-Encoding',
};

export function set_date_tree_entry<T>(
  tree: DateTree<T>,
  year: number,
  month: number,
  day: number,
  slug: string,
  value: T,
) {
  if (!tree[year]) {
    tree[year] = {};
  }
  if (!tree[year][month]) {
    tree[year][month] = {};
  }
  if (!tree[year][month][day]) {
    tree[year][month][day] = {};
  }
  tree[year][month][day][slug] = value;
}

export function get_date_tree_entry<T>(
  tree: DateTree<T>,
  year: number,
  month: number,
  day: number,
  slug: string,
): T | undefined {
  return tree[year]?.[month]?.[day]?.[slug];
}

export function date_tree_to_array<T>(tree: DateTree<T>): [[number, number, number], string, T][] {
  const entries: [[number, number, number], string, T][] = [];
  for (const [year, month_map] of Object.entries(tree)) {
    for (const [month, day_map] of Object.entries(month_map)) {
      for (const [day, slug_map] of Object.entries(day_map)) {
        for (const [slug, value] of Object.entries(slug_map)) {
          entries.push([[parseInt(year), parseInt(month), parseInt(day)], slug, value]);
        }
      }
    }
  }
  return entries;
}
