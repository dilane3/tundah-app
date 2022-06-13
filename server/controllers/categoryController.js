import { config } from "dotenv";
import CategoryModel from "../models/CategoryModel.js"

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class CategoryController {

    static categoryAlreadyExist = async (req, res) => {

        const { name } = req.body

        if(!name.trim()) return

        try{
            const { data, error } = await CategoryModel.categoryAlredyExist(name)

            if(data) return res.status(200).json({ data })
        }catch(err){
            console.log(err)
            return{ error: err }
        }
    }

    static getCathegories = async (req, res) => {

        try{
            const { data } = await CategoryModel.getCathegories()
            
            //format category
            
            if(data) return res.status(200).json({ data })
            return res.status(500).json({ error: "And error occured white geting category" })
        }catch(err){
            console.log(err);

            return{ error: err }
        }
    }

    static createCategory = async (req, res) => {
        const { name } = req.body

        if(!name) return res.status(400).json({ error: "provide all data to create category" })

        try{
            const { data } = await CategoryModel.createcategory(req.body)

            if(data) return res.status(200).json({ data })
        }catch(error){
            console.log(error);
            return { error }
        }
    }
}

export default CategoryController;
