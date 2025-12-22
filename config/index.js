const { Sequelize } = require("sequelize");

// Use in-memory sqlite for tests
if (process.env.NODE_ENV === "test") {
  const sequelize = new Sequelize("sqlite::memory:", { logging: false });
  module.exports = sequelize;
} else {
  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "localhost",
      dialect: process.env.DB_DIALECT || "mysql",
      logging: false,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    }
  );

  module.exports = sequelize;
}
