import {
  ArrayValidator,
  NumberValidator,
  StringValidator,
  ObjectValidator,
} from '../lib/validators/index.mjs';

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

  object() {
    return new ObjectValidator(this);
  }
}

export { Validator };
