import express from "express";
import database from "./config/database.js";
import catalog from "./models/catalog.js";
import route from "./routes/route.js";
import redisClient from "./config/redis.js";

const app = express();

try {
    database.authenticate();
    catalog.sync();
    console.log("database connected");
    redisClient.on("error", (err) => {
        throw new Error(err);
    });
    redisClient.connect();
    console.log("connect redis");
} catch (error) {
    console.log(error);
}

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(route);

app.listen(3001, console.log("running at port 3001"));
