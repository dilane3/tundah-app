import express from "express"
import authenticationMiddleware from "../middlewares/authentication.js";
import CathegoryController from "../controllers/categoryController.js"

const {
    createCathegory
} = CathegoryController

const cathegoryRouter = express.Router()

cathegoryRouter.post('/create', createCathegory)

export default cathegoryRouter