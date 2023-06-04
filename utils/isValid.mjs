const isValid = ({ ctx, validators, value }) => {
  for (const validate of validators) {
    if (!validate.call(ctx, value)) {
      return false;
    }
  }

  return true;
};

export { isValid };
