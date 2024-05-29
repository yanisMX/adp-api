import {UserBuilder} from "./userBuilder.js";
import {userRepository} from "./repository/userRepository.js";
import {userRetriever} from "./userRetriever.js";
import {authenticationToken} from "../authenticationToken.js";

async function create(username, email, password) {
	const user = new UserBuilder()
		.withUsername(username)
		.withEmail(email)
		.withPassword(password)
		.build();

	await userRepository.saveUser(user);

	return user.id;
}

async function login(email, password) {
	const user = await userRetriever.byEmail(email);
	user.checkPassword(password);

	return authenticationToken.generate(user);
}

function getUserData(sessionToken) {
	const decoded = authenticationToken.verify(sessionToken);

	return userRetriever.byId(decoded.user_id);
}

async function update(connectedUser, updatedUser) {
	connectedUser.update(updatedUser);

	await userRepository.editUser(connectedUser);
}

export const userService = {
	create,
	login,
	getUserData,
	update
};
