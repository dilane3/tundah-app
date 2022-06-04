import { nanoid } from "nanoid";

import dbConnect from "../utils/database.js"
import InterfaceCategoryModel from "./interfaces/interfaceCategoryModel.js";

class CategoryModel extends InterfaceCategoryModel {

    static async getAllCathegory(){
        const session = dbConnect()

        const query = `
            MATCH (cathegories:Cathegory)
            return cathegories
            ORDER BY cathegories.names
        `

        try{
            const result = session.run(query)
            console.log(result);
        }catch(err){
            console.log(err);
        }
    }

    static async createCathegory(name) {
        const session = dbConnect()

        const query = `
            CREATE(cathegory:Cathegory){
                id: $id,
                name: $name
            }
            RETURN cathegory
        `

        try{
            const result = await session.run(query, {
                id: nanoid(20),
                name
            })

            console.log(result)
        }catch(err){
            console.log(err)
            return{ error: "And error occured while creating the cathegory" }
        }
    }
}

export default CategoryModel