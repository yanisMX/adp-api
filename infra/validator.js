function isNotUndefined(value, errorMessage) {
  if (value === undefined) {
    throw new Error(errorMessage ?? "A value is required");
  }

    return value;
}

export const validator = {
    isNotUndefined
}