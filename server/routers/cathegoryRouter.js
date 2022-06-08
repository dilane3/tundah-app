import express from "express";
import CathegoryController from "../controllers/categoryController.js"
import authenticationMiddleware from "../middlewares/authentication.js";

const cathegoryRouter = express.Router()

const {
    getCathegories,
    getCathegory,
    createCathegory,
    updateCathegory,
    deleteCathegory
} = CathegoryController

cathegoryRouter.get("/", getCathegories)
cathegoryRouter.get("/:id", getCathegory)
cathegoryRouter.get("/create", createCathegory)
cathegoryRouter.get("/update", updateCathegory)
cathegoryRouter.get("/delete", deleteCathegory)

export default cathegoryRouter