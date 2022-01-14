import axios from "axios";

<<<<<<< HEAD
const instance = axios.create({
	baseURL: "http://localhost:5000/api",
=======
// const instance = axios.create({
// 	baseURL: "http://localhost:5000/api",
// })

// const instance = axios.create({
// 	baseURL: "http://192.168.43.81:5000/api",
// })

const instance = axios.create({
	baseURL: "http://localhost:3001/api/posts"
>>>>>>> c984f7ebb8920fa5d8c8b78c1afff4b443b4722e
})

// const instance = axios.create({
// 	baseURL: "http://192.168.43.81:5000/api",
// })

export {instance}