import { ArrayValidator, NumberValidator, StringValidator } from '../lib/validators/index.mjs';

class Validator {
  string() {
    return new StringValidator(this);
  }

  number() {
    return new NumberValidator(this);
  }

  array() {
    return new ArrayValidator(this);
  }
}

export { Validator };
