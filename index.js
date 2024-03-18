import express from "express";
import database from "./config/database.js";

const app = express();

try {
    database.authenticate();
    console.log("database connected");
} catch (error) {
    console.log(error);
}

app.listen(3001, console.log("running at port 3001"));
