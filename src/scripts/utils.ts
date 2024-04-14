import { createCodec } from 'msgpack-lite';

export const mp_codec = createCodec({
  int64: true,
  uint8array: true,
  safe: true,
  usemap: false,
});

export const blog_data_headers = {
  'Cache-Control': 'public, max-age=3600',
  'Content-Type': 'application/msgpack',
  Vary: 'Accept-Encoding',
};
