import { Router } from "express";
import {
    createCatalog,
    deleteCatalog,
    getCatalog,
    getCatalogById,
    updateCatalog,
} from "../controllers/catalogController.js";
import multer from "multer";

const route = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `image${Date.now()}.${file.originalname}`);
    },
});

const image = multer({
    storage,
});

route.get("/catalog", getCatalog);
route.get("/catalog/:id", getCatalogById);
route.post("/catalog", image.single("image"), createCatalog);
route.put("/catalog/:id", updateCatalog);
route.delete("/catalog/:id", deleteCatalog);

export default route;
