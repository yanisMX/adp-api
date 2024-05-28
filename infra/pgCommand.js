import {getConnection} from "./databaseConnection.js";

async function executeNonQuery(statement, ...parameters) {
	return getConnection(async (client) => {
		await client.query(statement, parameters);
	});
}

async function executeScalar(statement, ...parameters) {
	return getConnection(async (client) => {
		const result = await client.query(statement, parameters);
		return result.rows[0][0];
	});
}

async function executeDataRow(statement, ...parameters) {
	return getConnection(async (client) => {
		const result = await client.query(statement, parameters);
		return result.rows[0];
	});
}

async function executeDataTable(statement, ...parameters) {
	return getConnection(async (client) => {
		const result = await client.query(statement, parameters);
		return result.rows;
	});
}

export const pgCommand = {
	executeNonQuery,
	executeScalar,
	executeDataRow,
	executeDataTable
};