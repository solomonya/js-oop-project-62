class ObjectValidator {
  constructor() {
    this.isRequired = false;
    this.objectSchema = null;
  }

  shape(objectSchema) {
    this.objectSchema = objectSchema;
    return this;
  }
}

export { ObjectValidator };
