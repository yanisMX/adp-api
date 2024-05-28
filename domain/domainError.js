export class DomainError extends Error {
	constructor(errorCode, message, detail, statusCode = 500) {
		super(`${errorCode} : ${message}. ${detail}`);
		this.statusCode = statusCode;
	}

	static ADP_A001(field) {
		return new DomainError("ADP_A001", "Can't create account", `The ${field} cannot be null or undefined`, 400);
	}

	static ADP_A002() {
		return new DomainError("ADP_A002", "Can't connect to this account",`The password or email are incorrect`, 401);
	}
}