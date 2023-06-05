import { check, isValid } from '../../utils/index.mjs';

class StringValidator {
  constructor(schema) {
    this.isRequired = false;
    this.validators = new Set([this.checkIsString]);
    this.schema = schema;
    this.strMinLength = 0;
    this.subStrings = new Set();
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

  minlength(minLength) {
    this.strMinLength = minLength;
    this.validators.add(this.checkMinLength);
    return this;
  }

  contains(subString) {
    this.subStrings.add(subString);

    if (!this.validators.has(this.checkContains)) {
      this.validators.add(this.checkContains);
    }

    return this;
  }

  checkIsString(value) {
    const validate = (str) => typeof str === 'string' && str.length > 0;
    if (!this.isRequired && value === '') {
      return true;
    }

    return check(this.isRequired, value, validate);
  }

  checkMinLength(value) {
    const minLength = this.strMinLength;
    const validate = (str) => str.length >= minLength;

    return check(this.isRequired, value, validate);
  }

  checkContains(value) {
    const { subStrings } = this;
    const validate = (str) => Array
      .from(subStrings)
      .every((subString) => str.search(new RegExp(subString)) > -1);

    return check(this.isRequired, value, validate);
  }
}

export { StringValidator };
