import { config } from "dotenv";
import CategoryModel from "../models/CategoryModel.js"

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class CategoryController {

    static async createCathegory(req, res){
        
        const { name } = req.body

        if(!name || name.length < 5) return res.status(400).json({ error: "Name of the cathegory to short" })

        name = name.trim()

        try{
            const result = await CategoryModel.createCathegory(name)

            if(result) return res.status(201).json({ result })
        }catch(err){
            return { error: err }
        }
    }
}

setSearrch(value)


export default CategoryController