import { config } from "dotenv";
import CategoryModel from "../models/CategoryModel"

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class CategoryController {

    static getCathegories = async (req, res) => {
        const { skip, limit } = req.query

        if(!limit || !skip) return res.status(400).json({ error: "specify de limit and the skip cathegory to fetch" })

        try{
            const { data, error } = await CategoryModel.getCathegories(skip, limit)

            console.log(data)

            if(data) return res.status(200).json({ data })
        }catch(err){
            console.log(err);

            return{ error: err }
        }
    }
}

export default CategoryController;
