import { config } from "dotenv";
import CategoryModel from "../models/CategoryModel.js";

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class CategoryController {
  static categoryAlreadyExist = async (req, res) => {
    const { name } = req.body;

    if (!name.trim()) return;

    try {
      const { data, error } = await CategoryModel.categoryAlredyExist(name);

      if (data) return res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  };

  static getCathegories = async (req, res) => {
    try {
      const { data } = await CategoryModel.getCathegories();

      //format category

      if (data) return res.status(200).json({ data });
      return res
        .status(500)
        .json({ error: "And error occured white geting category" });
    } catch (err) {
      console.log(err);

      return { error: err };
    }
  };

  static getCategory = async (req, res) => {
    const { id } = req.params;

    if (!id)
      return res
        .Status(400)
        .json({ error: "Provide all informations to get category" });

    try {
      const { data, error } = await CategoryModel.getCategory(id);

      if (data) return res.status(200).json(data);
      return res.status(500).json(error);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "And error occured while gething category" });
    }
  };

  static createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ error: "provide all data to create category" });

    try {
      const { data, error } = await CategoryModel.createcategory(req.body);

      if (data) return res.status(200).json({ data });
      return res.status(500).json(error);
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  static deleteCategory = async (req, res) => {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ error: "provide all data to delete the category" });

    try {
      const { data, error } = await CategoryModel.deleteCategory(id);

      if (data) return res.status(200).json({ data });
      return res.status(500).json(error);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };

  static getUserFollowedCategories = async ({ id }, req, res) => {
    // const user = req.user

    // const { value } = req.params

    console.log(id);

    try {
      if (id) {
        const { data, error } = await CategoryModel.getUserCategoriesFollowed(
          id.value
        );

        return { data };
        // if(data.length > 0) {
        //     return res.status(200).json(data)
        // } else {
        //     return res.status(500).json({ message: "Server Internal Error" })
        // }
      } else {
        return res
          .status(400)
          .json({ message: "The user identifier is needed" });
      }
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
}

export default CategoryController;
