import { decode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';
import lz4 from 'lz4js';

export default function read_bin(data: Uint8Array) {
  const decompressed = lz4.decompress(data);
  return decode(decompressed, { codec: mp_codec });
}
