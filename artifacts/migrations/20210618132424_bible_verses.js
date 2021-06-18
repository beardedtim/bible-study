/**
 *
 * @param {import('knex')} knex
 * @returns
 */
exports.up = function (knex) {
  return knex.schema.createTable("verses", (table) => {
    table.integer("chapter_num");
    table.integer("verse_num");
    table.text("verse_txt");
    table.string("book_name");
    table.string("translation");

    table.index(["translation"]);
    table.index(["book_name"]);
    table.index(["translation", "book_name"]);
    table.index(["book_name", "chapter_num"]);
    table.index(["translation", "book_name", "chapter_num"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("verses");
};
