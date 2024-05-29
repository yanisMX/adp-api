import {v4} from "uuid";
import {User} from "./user.js";
import {hash} from "../../infra/hash.js";
import {check} from "../../infra/check.js";
import {DomainError} from "../domainError.js";

export class UserBuilder {
	constructor() {
		this.id = v4();
		this.username = "";
		this.email = "";
		this.password = "";
		this.revenue = 0;
	}

	withUsername(username) {
		if (check.isUndefined(username))
			throw DomainError.ADP_A001("username");
		this.username = username;
		return this;
	}

	withEmail(email) {
		if (check.isUndefined(email))
			throw DomainError.ADP_A001("email")
		this.email = email;
		return this;
	}

	withPassword(password) {
		if (check.isUndefined(password))
			throw DomainError.ADP_A001("password");
		this.password = hash.compute(password);
		return this;
	}

	build() {
		return new User(this.id, this.username, this.email, this.password, this.revenue);
	}
}

