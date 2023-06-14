import { isValid as validate } from '../../utils/index.mjs';

class ObjectValidator {
  constructor() {
    this.isRequired = true;
    this.objectSchema = null;
  }

  shape(objectSchema) {
    this.objectSchema = objectSchema;
    return this;
  }

  isValid(value) {
    if (value === null
      || value === undefined
      || this.objectSchema === null
      || this.objectSchema === undefined) {
      return false;
    }

    const checks = Object
      .keys(value)
      .reduce((acc, key) => {
        const validator = this.objectSchema[key];
        const currentValue = value[key];

        if (validator === undefined) {
          acc.push(false);
          return acc;
        }

        if (typeof currentValue === 'object' && !Array.isArray(currentValue) && currentValue !== null) {
          acc.push(this.isValid.call(validator, currentValue));
          return acc;
        }

        const isValid = validate(
          { ctx: validator, validators: validator.validators, value: currentValue },
        );
        acc.push(isValid);
        return acc;
      }, []);
    return checks.every(Boolean);
  }
}

export { ObjectValidator };
