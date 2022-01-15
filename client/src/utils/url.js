import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/api",
})

// const instance = axios.create({
// 	baseURL: "http://192.168.43.81:5000/api",
// })

// const instance = axios.create({
// 	baseURL: "http://localhost:3001/api/posts"
// })


export {instance}