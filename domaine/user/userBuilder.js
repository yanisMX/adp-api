import {v4} from "uuid";
import {User} from "./user.js";
import {hash} from "../../infra/hash.js";
import {validator} from "../../infra/validator.js";

export class UserBuilder {
	constructor() {
		this.id = v4();
		this.username = "";
		this.email = "";
		this.password = "";
	}

	withUsername(username) {
		this.username = validator.isNotUndefined(username, "A username is required to create an account");
		return this;
	}

	withEmail(email) {
		this.email = validator.isNotUndefined(email, "An email is required to create an account");
		return this;
	}

	withPassword(password) {
		hash.compute(validator.isNotUndefined(password)).then((hashedPassword) => {
			this.password = hashedPassword;
		});
		return this;
	}

	build() {
		return new User(this.id, this.username, this.email, this.password);
	}
}

