import type { ParamMatcher } from '@sveltejs/kit';

const INTEGER_REGEX = /^(0?[1-9]|1[0-2])$/;
export const match: ParamMatcher = (param) => {
  return INTEGER_REGEX.test(param);
};
