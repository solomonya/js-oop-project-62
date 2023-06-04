import { StringValidator } from '../lib/validators/index.mjs';

class Validator {
  constructor() {
    this.isRequired = false;
    this.validator = null;
  }

  string() {
    this.validator = new StringValidator(this);
    return this.validator;
  }

  setRequired() {
    this.isRequired = true;
  }
}

export { Validator };
