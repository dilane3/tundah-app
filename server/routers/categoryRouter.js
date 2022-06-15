import express from "express";
import CathegoryController from "../controllers/categoryController.js";
import authenticationMiddleware from "../middlewares/authentication.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  authenticationMiddleware,
  CathegoryController.getCathegories
);
categoryRouter.get(
  "/:id",
  authenticationMiddleware,
  CathegoryController.getCategory
);
categoryRouter.get(
  "/categoryAlreadyExist",
  authenticationMiddleware,
  CathegoryController.categoryAlreadyExist
);
categoryRouter.post(
  "/create",
  authenticationMiddleware,
  CathegoryController.createCategory
);
// categoryRouter.patch("/update", CathegoryController.updateCategory)
categoryRouter.delete(
  "/delete/:id",
  authenticationMiddleware,
  CathegoryController.deleteCategory
);

categoryRouter.get(
  "/myCategories/:value",
  // authenticationMiddleware,
  CathegoryController.getUserFollowedCategories
);
// categoryRouter.patch("/update", authenticationMiddleware, CathegoryController.updateCategory)
// categoryRouter.delete("/delete", authenticationMiddleware, CathegoryController.deleteCategory)

export default categoryRouter;
