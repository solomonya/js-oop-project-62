const { Validator } = require('../index');

test('Validator works', () => {
  const validator = new Validator();
  expect(validator.test()).toBe('hello world');
});