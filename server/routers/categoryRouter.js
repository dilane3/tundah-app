import express from "express";
import CathegoryController from "../controllers/categoryController.js"
import authenticationMiddleware from "../middlewares/authentication.js";

const categoryRouter = express.Router()


categoryRouter.get("/", CathegoryController.getCathegories)
categoryRouter.get("/:id", CathegoryController.getCategory)
categoryRouter.get("/categoryAlreadyExist", CathegoryController.categoryAlreadyExist)
categoryRouter.post("/create", CathegoryController.createCategory)
// categoryRouter.patch("/update", CathegoryController.updateCategory)
// categoryRouter.delete("/delete", CathegoryController.deleteCategory)

export default categoryRouter