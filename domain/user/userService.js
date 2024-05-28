import {UserBuilder} from "./userBuilder.js";
import {userRepository} from "./repository/userRepository.js";
import {userRetriever} from "./userRetriever.js";
import {authenticationToken} from "../../infra/authenticationToken.js";

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

export const userService = {
	create,
	login,
};