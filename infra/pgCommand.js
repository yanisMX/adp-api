import {executeCommand} from "./databaseConnection.js";

async function executeNonQuery(statement, ...parameters) {
	return executeCommand(async (client) => {
		await client.query(statement, parameters);
	});
}

async function executeScalar(statement, ...parameters) {
	return executeCommand(
		async (client) => (await client.query(statement, parameters)).rows[0][0]
	);
}

function executeDataRow(statement, ...parameters) {
	return executeCommand(
		async (client) => (await client.query(statement, parameters)).rows[0]
	);
}

async function executeDataTable(statement, ...parameters) {
	return executeCommand(
		async (client) => (await client.query(statement, parameters)).rows
	);
}

export const pgCommand = {
	executeNonQuery,
	executeScalar,
	executeDataRow,
	executeDataTable,
};
