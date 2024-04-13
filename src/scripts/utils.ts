import { createCodec } from 'msgpack-lite';

export const mp_codec = createCodec({
  int64: true,
  uint8array: true,
  safe: true,
  usemap: true,
});
