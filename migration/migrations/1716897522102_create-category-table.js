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
	pgm.createTable('category',{
		id: {type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		name: { type: 'varchar(100)', notNull: true},
		budget: { type: 'float', notNull: true},
		user_id: { type: 'uuid', notNull: true, references: 'user'},
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable('category');
};
