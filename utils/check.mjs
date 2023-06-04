import { isNull } from './isNull.mjs';

const check = (required, value, validate) => {
  if (!required) {
    return isNull(value) || value.length === 0 || validate(value);
  }
  return !isNull(value) && validate(value);
};

export { check };
