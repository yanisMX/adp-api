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
	pgm.createTable('spending',{
		id: {type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
		category_id: { type: 'uuid', notNull: true, references: 'category'},
		amount: { type: 'float', notNull: true},
		name: { type: 'varchar(100)', notNull: true},
		date: { type: 'timestamp', notNull: true},
		recurrent: {type: 'boolean', notNull: true, default: false},
	});
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.dropTable('spending');
};
