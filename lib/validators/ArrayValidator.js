import { check, isValid } from '../../utils/index.mjs';

class ArrayValidator {
  constructor(schema) {
    this.isRequired = false;
    this.schema = schema;
    this.validators = new Set([this.checkIsArray]);
    this.requiredSize = 0;
  }

  required() {
    this.isRequired = true;
    return this;
  }

  isValid(value) {
    return isValid(
      { ctx: this, validators: this.validators, value },
    );
  }

  sizeOf(size) {
    this.requiredSize = size;
    if (!this.validators.has(this.checkSize)) {
      this.validators.add(this.checkSize);
    }

    return this;
  }

  checkIsArray(value) {
    const validate = (array) => Array.isArray(array);
    return check(this.isRequired, value, validate);
  }

  checkSize(value) {
    const validate = (array) => array?.length === this.requiredSize;
    return check(this.isRequired, value, validate);
  }
}

export { ArrayValidator };
