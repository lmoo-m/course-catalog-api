import { Sequelize } from "sequelize";

const database = new Sequelize({
    database: "course",
    username: "root",
    password: "",
    host: "localhost",
    dialect: "mysql",
});

export default database;
