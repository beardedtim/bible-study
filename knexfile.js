// Update with your config settings.

module.exports = {
  client: "postgresql",
  connection: {
    host: "0.0.0.0",
    port: 9999,
    user: "username",
    password: "password",
    database: "bible_app",
  },
  migrations: {
    directory: "artifacts/migrations",
  },
  seeds: {
    directory: "artifacts/seeds",
  },
};
