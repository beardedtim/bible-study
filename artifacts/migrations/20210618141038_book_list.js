exports.up = function (knex) {
  return knex.schema.createTable("books", (table) => {
    table.string("book_name");
    table.integer("order");
    table.string("testament");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("books");
};
