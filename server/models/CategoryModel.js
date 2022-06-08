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


}

export default CategoryModel