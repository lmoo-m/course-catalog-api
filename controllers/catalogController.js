import redisClient from "../config/redis.js";
import catalog from "../models/catalog.js";
import fs from "fs";

export const getCatalog = async (req, res) => {
    try {
        const dataRedis = await redisClient.get("catalog");

        if (!dataRedis) {
            const data = await catalog.findAll();
            await redisClient.set("catalog", JSON.stringify(data));

            return res.send({
                status: true,
                msg: "success get catalog",
                data,
            });
        }
        return res.send({
            status: true,
            msg: "success get catalog from redis",
            data: JSON.parse(dataRedis),
        });
    } catch (error) {
        console.log(error);
        return res.send("server error");
    }
};

export const getCatalogById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await catalog.findOne({ where: { courseId: id } });

        return res.send({
            status: true,
            msg: "success get catalog",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.send("server error");
    }
};

export const createCatalog = async (req, res) => {
    const image = req.file;
    const { courseId, courseName } = req.body;
    try {
        if (!(courseId, courseName, image) || (courseId, courseName) === "") {
            return res.send({
                status: false,
                msg: "required field",
            });
        }

        const data = await catalog.create({
            courseId,
            courseName,
            image: image.filename,
        });

        redisClient.del("catalog");

        return res.send({
            status: true,
            msg: "success create catalog",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.send("server error");
    }
};

export const updateCatalog = async (req, res) => {
    const { id } = req.params;
    const { courseName } = req.body;
    const image = req.file;
    try {
        if (courseName === "") {
            return res.send({
                status: false,
                msg: "required field",
            });
        }

        const data = await catalog.findOne({
            where: {
                courseId: id,
            },
        });

        if (!data) {
            return res.send({
                status: false,
                msg: "data not found",
            });
        }

        if (image) {
            fs.unlink(`./uploads/${data.image}`, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("deleted file");
            });
            await data.update({ courseName, image });
            return res.send({
                status: true,
                msg: "success update catalog",
                data,
            });
        }

        await data.update({ courseName });

        redisClient.del("catalog");
        return res.send({
            status: true,
            msg: "success update catalog",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.send("server error");
    }
};

export const deleteCatalog = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await catalog.findOne({
            where: {
                courseId: id,
            },
        });

        if (!data) {
            return res.send({
                status: false,
                msg: "data not found",
            });
        }

        fs.unlink(`./uploads/${data.image}`, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("deleted file");
        });
        await data.destroy();

        redisClient.del("catalog");

        return res.send({
            status: true,
            msg: "success delete catalog",
            data,
        });
    } catch (error) {
        console.log(error);
        return res.send("server error");
    }
};
