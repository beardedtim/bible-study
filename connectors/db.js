const Knex = require("knex");
const config = require("../knexfile");

module.exports = Knex({
  ...config,
  // debug: true,
});
