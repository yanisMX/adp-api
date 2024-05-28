import {pgCommand} from "../../../infra/pgCommand.js";

async function saveUser(user) {
	const statement = "INSERT INTO users(id, username, email, password) VALUES ($1, $2, $3, $4)";

	await pgCommand.executeNonQuery(statement, user.id, user.username, user.email, user.password);
}

function getUserByEmail(email) {
	const statement = "SELECT id, username, email, password FROM users WHERE email = $1";
	return pgCommand.executeDataRow(statement, email);
}


export const userRepository = {
	saveUser,
	getUserByEmail
};