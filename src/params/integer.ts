import type { ParamMatcher } from '@sveltejs/kit';

const INTEGER_REGEX = /^\d+$/;
export const match: ParamMatcher = (param) => {
  return INTEGER_REGEX.test(param);
};
