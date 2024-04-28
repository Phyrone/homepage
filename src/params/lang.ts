import type { ParamMatcher } from '@sveltejs/kit';

const LANG_REGEX = /^[a-zA-Z]{2}$/;

export const match: ParamMatcher = (param) => {
  return LANG_REGEX.test(param);
};
