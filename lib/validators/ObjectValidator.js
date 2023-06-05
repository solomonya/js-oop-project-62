import { isValid as validate } from '../../utils/index.mjs';

class ObjectValidator {
  constructor() {
    this.isRequired = false;
    this.objectSchema = null;
  }

  shape(objectSchema) {
    this.objectSchema = objectSchema;
    return this;
  }

  isValid(value) {
    const checks = Object
      .keys(value)
      .reduce((acc, key) => {
        const validator = this.objectSchema[key];
        const isValid = validate(
          { ctx: validator, validators: validator.validators, value: value[key] },
        );
        acc.push(isValid);
        return acc;
      }, []);
    return checks.every(Boolean);
  }
}

export { ObjectValidator };
