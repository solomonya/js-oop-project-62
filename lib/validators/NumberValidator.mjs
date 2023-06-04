import { check, isValid } from '../../utils/index.mjs';

class NumberValidator {
  constructor(schema) {
    this.schema = schema;
    this.validators = new Set([this.numberCheck]);
    this.ranges = {
      min: -Infinity,
      max: Infinity,
    };
  }

  required() {
    this.schema.setRequired();
    return this;
  }

  isValid(value) {
    return isValid(
      { ctx: this, validators: this.validators, value },
    );
  }

  positive() {
    this.validators.add(this.positiveCheck);
    return this;
  }

  range(min, max) {
    this.ranges = { min, max };
    this.validators.add(this.rangeCheck);
    return this;
  }

  numberCheck(value) {
    const validate = (number) => typeof number === 'number';
    return check(this.schema.isRequired, value, validate);
  }

  positiveCheck(value) {
    const validate = (number) => number > 0;
    return check(this.schema.isRequired, value, validate);
  }

  rangeCheck(value) {
    const validate = (number) => number >= this.ranges.min && number <= this.ranges.max;
    return check(this.schema.isRequired, value, validate);
  }
}

export { NumberValidator };
