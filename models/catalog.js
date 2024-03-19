import { DataTypes } from "sequelize";
import database from "../config/database.js";

const catalog = database.define(
    "catalog",
    {
        courseId: {
            allowNull: true,
            unique: true,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        courseName: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        freezeTableName: false,
    }
);

export default catalog;
