import { encode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';
import lz4 from 'lz4js';

export default function write_bin(data: any): Uint8Array {
  const encoded = encode(data, { codec: mp_codec });
  const compressed = lz4.compress(encoded);
  return compressed;
}
