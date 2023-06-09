import test from 'node:test';
import { strict as assert } from 'node:assert';
import { Validator } from '../index.mjs';

test('Array validation', async (t) => {
  await t.test('Create non required array schema', () => {
    const validator = new Validator();
    const schema = validator.array();

    assert.equal(schema.isValid(null), true);
    assert.equal(schema.isValid(undefined), true);
    assert.equal(schema.isValid([]), true);
    assert.equal(schema.isValid(''), false);
  });

  await t.test('Create required array schema', () => {
    const validator = new Validator();
    const schema = validator.array().required();

    assert.equal(schema.isValid(null), false);
    assert.equal(schema.isValid(undefined), false);
    assert.equal(schema.isValid([]), true);
    assert.equal(schema.isValid([1, 2, 3]), true);
  });

  await t.test('Check sizeof', () => {
    const validator = new Validator();
    const schema = validator.array().sizeOf(4);

    assert.equal(schema.isValid([]), false);
    assert.equal(schema.isValid([1, 2, 3]), false);
    assert.equal(schema.isValid([1, 2, 3, 4]), true);
    assert.equal(schema.isValid(null), true);
    assert.equal(schema.isValid(undefined), true);

    schema.required();
    assert.equal(schema.isValid(null), false);
    assert.equal(schema.isValid(undefined), false);

    schema.sizeOf(5);
    assert.equal(schema.isValid([1, 2, 3, 4]), false);
    assert.equal(schema.isValid([1, 2, 3, 4, 5]), true);
  });
});
