import {userService} from "../domain/user/userService.js";

export async function authenticationProvider(req, res, next) {
	try {
		const {sessionToken} = req.cookies;

		req.user = await userService.getUserData(sessionToken);
	} catch (error) {
		next(error);
	}
}