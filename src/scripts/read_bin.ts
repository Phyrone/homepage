import { decode } from 'msgpack-lite';
import { mp_codec } from '$scripts/utils';
import lz4 from 'lz4js';
import { RequestError } from '$scripts/types';

export default function read_bin(data: Uint8Array) {
  const decompressed = lz4.decompress(data);
  return decode(decompressed, { codec: mp_codec });
}

export type ReadResult<T> = (T & { success: true }) | (Response & { success: false });

export async function read_bin_response<T>(response: Promise<Response>): Promise<T> {
  const awaited = await response;
  if (awaited.ok) {
    const buffer = await awaited.arrayBuffer();
    const decoded = read_bin(new Uint8Array(buffer));
    if (typeof decoded === 'object') {
      return { ...decoded };
    } else {
      return decoded;
    }
  } else {
    throw new RequestError(awaited);
  }
}
