import {UserBuilder} from "./userBuilder.js";
import {userRepository} from "./repository/userRepository.js";

async function create(username, email, password) {
	const user = new UserBuilder().withUsername(username)
								  .withEmail(email)
								  .withPassword(password)
								  .build();

	await userRepository.saveUser(user);

	return user.id;
}

export const userService = {
	create
};