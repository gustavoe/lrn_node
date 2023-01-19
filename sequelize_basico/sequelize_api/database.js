const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("test-db", "user", "pass", {
    dialect: "sqlite",
    // host: ":memory",
    host: "./db.sqlite",
});

module.exports = sequelize;
