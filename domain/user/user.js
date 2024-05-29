import {DomainError} from "../domainError.js";
import {hash} from "../../infra/hash.js";
import {check} from "../../infra/check.js";

export class User {
	constructor(id, username, email, password, revenue) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.revenue = revenue;
	}

	checkPassword(givenPassword) {
		const isPasswordMatch = hash.compare(givenPassword, this.password);

		if (!isPasswordMatch)
			throw DomainError.ADP_A002();
	}

	update(updatedUser) {
		this.username = check.isUndefined(updatedUser.username) ? this.username : updatedUser.username;
		this.email = check.isUndefined(updatedUser.email) ? this.email : updatedUser.email;
		this.revenue = check.isUndefined(updatedUser.revenue) ? this.revenue : updatedUser.revenue;
		this.password = check.isUndefined(updatedUser.password) ? this.password : hash.compute(updatedUser.password);
	}
}
