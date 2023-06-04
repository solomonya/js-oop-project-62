import StringValidator from '../lib/validators/index.mjs';

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

  isValid({ ctx, validators, value }) {
    for (const validate of validators) {
      if (!validate.call(ctx, value)) {
        return false;
      }
    }

    return true;
  }
}

export default Validator;
