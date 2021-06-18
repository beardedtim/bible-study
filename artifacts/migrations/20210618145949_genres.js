exports.up = function (knex) {
  return knex.schema
    .createTable("genres", (table) => {
      table.integer("id").primary().notNullable().unique();
      table.text("name");
    })
    .alterTable("verses", (table) => {
      table.integer("genre");
      table.foreign("genre").references("genres.id");
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("verses", (table) => {
      table.dropColumn("genre");
    })
    .dropTable("genres");
};
