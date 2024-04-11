import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) => {
  return resolve(event, {
    //TODO determine language
    transformPageChunk: ({ html }) => html.replace('%lang%', 'de'),
  });
};
