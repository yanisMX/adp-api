/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
	pgm.createTable('user',{
		id: {type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		username: { type: 'varchar(100)', notNull: true},
		email: { type: 'varchar', notNull: true},
		password: { type: 'text', notNull: true},
		revenue: { type: 'float', notNull: false},
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable('user');
};
