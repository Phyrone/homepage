import { createCodec } from 'msgpack-lite';

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
