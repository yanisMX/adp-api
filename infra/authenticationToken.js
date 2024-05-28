import jwt from "jsonwebtoken";

const oneDay = 60 * 60 * 24 * 1000; // in miliseconds
const jwtSecret = process.env.JWT_SECRET;

function generate(user) {
	const expiryDate = Date.now() + oneDay;
	const payload = {
		user_id: user.id,
		exp: expiryDate,
		aud: "adp customers",
		iss: "adp"
	};

	return jwt.sign(payload, jwtSecret);
}

export const authenticationToken = {
	generate
};