import {DomainError} from "../domain/domainError.js";

export function errorHandler(err, req, res, next) {
	if (err instanceof DomainError) {
		res.status(err.statusCode).json({message: err.message});
	} else {
	  console.log(err);
		res.status(500).send()
	}

	next();
}