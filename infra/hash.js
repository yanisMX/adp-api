import bcrypt from "bcrypt";

function compute(value) {
  return bcrypt.hashSync(value, 10);
}

function compare(clearValue, hashedValue) {
  return bcrypt.compareSync(clearValue, hashedValue);
}

export const hash = {
  compute,
  compare,
};
