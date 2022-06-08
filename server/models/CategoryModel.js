import { nanoid } from "nanoid";
import { error, session } from "neo4j-driver";

import dbConnect from "../utils/database.js"
import InterfaceCategoryModel from "./interfaces/interfaceCategoryModel.js";

class CategoryModel extends InterfaceCategoryModel {

    static getCathegories = async (skip, limit) => {

        const session = dbConnect()

        const query = `
            MATCH (cathegory:Cathegory)
            return cathegory
            ORDER BY cathegory.name
            SKIP $skip
            LIMIT $limit
        `

        try{
            const result = await session.run(query, { skip, limit })

            if(result.records.length > 0){
                const cathegoryData = result.records[0].get("cathegory").properties
                return({ data: cathegoryData })
            }else{
                return({ data: null })
            }
        }catch(err){
            console.log(err);
            return({ error: "And error occured while geting cathegories" })
        }finally{
            await session.close()
        }
    }

    /**
     * This function get cathegory with the given id
     * @param {id} id 
     * @returns cathegory | error
     */
    static getCathegory = async (id) => {
        const session = dbConnect()

        const query = `
            MATCH (cathegory:Cathegory{ id: $id })
            return cathegory
        `

        try{
            const result = await session.run(query, { id })

            if (result.records.length > 0){
                const cathegoryData = result.records[0].get("cathegory").properties

                return { data: cathegoryData }
            }
            return { error: "Error while creating an user" };
        }catch(err){
            console.log(err)
            return{ error: "And error occured while geting the cathégory" }
        }finally{
            session.close()
        }
    }

    /**
     * This function create a cathegory
     * @param {id} id 
     * @param {name} name 
     * @returns data | error
     */
    static createCathegory = async ({ id, name }) => {
        const session = dbConnect()

        const query = `
            CREATE(cathegory:Cathegory{
                id: $id,
                name: $name
            })
            RETURN cathegory
        `

        try{
            const result = await session.run(query, { id, name })

            if (result.records.length > 0){
                const cathegoryData = result.records[0].get("cathegory").properties

                return { data: cathegoryData }
            }
            return { error: "Error while creating an user" };
        }catch(err){
            console.log(err)
            return { error: "Error while creating an user" };
        }finally{
            session.close()
        }
    }

    /**
     * This function delete cathegory 
     * @param {id} id 
     * @returns cathegory | error
     */
    static deleteCathegory = async (id) => {
        const session = dbConnect()

        const query = `
            MATCH(cathegory:Cathegory{ id: $id })
            DETACH DELETE cathegory
        `
        try{
            const result = await session.run(query, { id })

            if (result.records.length > 0){
                const cathegoryData = result.records[0].get("cathegory").properties

                return { data: cathegoryData }
            }
            return { error: "Error while deleting a cathegory" };
        }catch(err){
            console.log(err)

            return { error: "And occured while deleting the cathegory" }
        }finally{
            session.close()
        }
    }


}

export default CategoryModel