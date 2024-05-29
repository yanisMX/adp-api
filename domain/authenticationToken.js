import jwt from "jsonwebtoken";
import {DomainError} from "./domainError.js";

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

function verify(sessionToken) {
	try{
		return jwt.verify(sessionToken, jwtSecret);
	}catch{
		throw DomainError.ADP_A003();
	}
}

export const authenticationToken = {
	generate,
	verify
};