import { nanoid } from "nanoid";
import { error, session } from "neo4j-driver";

import dbConnect from "../utils/database.js";
import InterfaceCategoryModel from "./interfaces/interfaceCategoryModel.js";

class CategoryModel extends InterfaceCategoryModel {
  /**
   * This function check if the category with the given name alrady exist in database
   * @param {name} name
   * @returns true | false
   */
  static categoryAlredyExist = async (name) => {
    const session = dbConnect();

    const query = `
        MATCH(category:Category{ name: $name })
        RETURN category
    `;

    try {
      const result = await session.run(query, { name });

      if (result.records.length > 0) {
        const category = result.records[0].get("category").properties;

        return category ? true : false;
      }

      return null;
    } catch (err) {
      console.log(err);

      return { error: "And error occured while check the category" };
    } finally {
      await session.close();
    }
  };

  /**
   * This function fetch all cathegories in database
   * @returns cathegories | error
   */
  static getCathegories = async () => {
    const session = dbConnect();

    const query = `
          MATCH (categories:Category)
          RETURN categories
      `;
    try {
      const result = await session.run(query);

      console.log(result.records[0]);

      if (result.records.length > 0) {
        const categories = [];

        for (let record of result.records) {
          const category = record.get("categories").properties;
          categories.push(category);
        }
        return { data: categories };
      } else {
        return {
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return { error: "And error occured while geting cathegories" };
    } finally {
      await session.close();
    }
  };

  /**
   * This function get category with the given id
   * @param {id} id
   * @returns category | error
   */
  static getCategory = async (id) => {
    const session = dbConnect();

    const query = `
            MATCH (category:Category{ id: $id })
            return category
        `;

    try {
      const result = await session.run(query, { id });

      if (result.records.length > 0) {
        const categoryData = result.records[0].get("category").properties;

        return { data: categoryData };
      }
      return { error: "Error while creating an user" };
    } catch (err) {
      console.log(err);
      return { error: "And error occured while geting the cathégory" };
    } finally {
      session.close();
    }
  };

  /**
   * This function create a category
   * @param {id} id
   * @param {name} name
   * @returns data | error
   */
  static createcategory = async ({ name }) => {
    const session = dbConnect();

    const query = `
        CREATE(category:Category{
            id: $id,
            name: $name
        })
        RETURN category
    `;

    try {
      const result = await session.run(query, { id: nanoid(20), name });

      if (result.records.length > 0) {
        const categoryData = result.records[0].get("category").properties;

        return { data: categoryData };
      }
      return { error: "Error while creating an user" };
    } catch (err) {
      console.log(err);
      return { error: "Error while creating an user" };
    } finally {
      session.close();
    }
  };

  /**
   * This function delete category
   * @param {id} id
   * @returns category | error
   */
  static deletecategory = async (id) => {
    const session = dbConnect();

    const query = `
            MATCH(category:Category{ id: $id })
            DETACH DELETE category
        `;
    try {
      const result = await session.run(query, { id });

      if (result.records.length > 0) {
        const categoryData = result.records[0].get("category").properties;

        return { data: categoryData };
      }
      return { error: "Error while deleting a category" };
    } catch (err) {
      console.log(err);

      return { error: "And occured while deleting the category" };
    } finally {
      session.close();
    }
  };

  static updatecategory = async ({ id, name }) => {
    const session = dbConnect();

    const query = `
            MATCH(category:Category{ id: $id })
            SET
                category.name = $name
            RETURN category
        `;

    try {
      const result = await session.run(query, { id, name });
      if (result.records.length > 0) {
        const categoryData = result.records[0].get("category").properties;

        return { data: categoryData };
      } else {
        return { data: null };
      }
    } catch (err) {
      console.log(err);
      return { error: "Adnd error occured while updating the category" };
    } finally {
      session.close;
    }
  };

  /**
   * This function get categories followed by a given user
   * @param {String} idUser
   * @returns category | error
   */
  static getUserCategoriesFollowed = async (idUser) => {
    const session = dbConnect();

    const query = `
            MATCH (user:Subscriber{id: $idUser}) - [:FOLLOWS_CATEGORY] -> (category:Category)
            return category
        `;
    try {
      const result = await session.run(query, { idUser });

      let categories = [];
      console.log(result.records);

      for (let record of result.records) {
        const category = record.get("category").properties;

        categories.push({
          ...category,
        });
      }

      if (categories.length > 0) {
        return { data: categories };
      } else {
        return { data: [] };
      }
    } catch (err) {
      console.log(err);
      return { error: "And error occured while geting the cathégory" };
    } finally {
      session.close();
    }
  };
}

export default CategoryModel;
