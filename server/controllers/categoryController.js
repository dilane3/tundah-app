import { config } from "dotenv";

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class CategoryController {}

export default CategoryController;
