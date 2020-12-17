
exports.up = function(knex) {
  return knex.schema.createTable('cars', (table) => {
      table.increments()
      table.string('model', 128)
      table.string('make', 128)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
