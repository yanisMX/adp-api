import {pgCommand} from "../../../infra/pgCommand.js";

function saveUser(user) {
	const statement = "INSERT INTO users(id, username, email, password) VALUES ($1, $2, $3, $4)";

	return pgCommand.executeNonQuery(statement, user.id, user.username, user.email, user.password);
}

function getUserByEmail(email) {
	const statement = "SELECT id, username, email, password, revenue FROM users WHERE email = $1";

	return pgCommand.executeDataRow(statement, email);
}

function getUserById(userId) {
	const statement = "SELECT id, username, email, password, revenue FROM users WHERE id = $1";

	return pgCommand.executeDataRow(statement, userId);
}

function editUser(user) {
	const statement = "UPDATE users SET username = $1, email = $2, password = $3, revenue= $4 WHERE id = $5";

	return pgCommand.executeNonQuery(statement, user.username, user.email, user.password, user.revenue, user.id);

}

export const userRepository = {
	saveUser,
	getUserByEmail,
	getUserById,
	editUser
};