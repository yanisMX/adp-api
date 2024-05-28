import pg from "pg";
import "dotenv/config";

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const pool = new pg.Pool({
							 user: PGUSER,
							 host: PGHOST,
							 database: PGDATABASE,
							 password: PGPASSWORD,
							 port: 5432,
							 ssl: {
								 rejectUnauthorized: false,
							 }
						 });

export async function getConnection(command) {
	let result;
	await pool.connect(async (err, client, done) => {
		if (err) {
			throw err;
		}

		result = await command(client);

		done();
	});
	return result;
}

