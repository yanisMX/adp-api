import bcrypt from "bcrypt";

async function compute(value) {
	let hashedValue;
	bcrypt.hash(value, 10)
		  .then((hash) => {
			  hashedValue = hash;
		  });

	return hashedValue;
}

function compare(value1, value2) {
	return compute(value1) === compute(value2);
}

export const hash = {
	compute,
	compare
}