import type { ParamMatcher } from '@sveltejs/kit';

const INTEGER_REGEX = /^(0?[1-9]|[12][0-9]|3[01])$/;
export const match: ParamMatcher = (param) => {
  return INTEGER_REGEX.test(param);
};
