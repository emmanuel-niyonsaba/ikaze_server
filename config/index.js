const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
process.env.DATABASE_NAME,
process.env.DB_USERNAME,
process.env.DB_PASSWORD,
  
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    port:3306,
  }
);



module.exports = sequelize
