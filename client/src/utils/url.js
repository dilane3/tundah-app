import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:4200/api",
})

// const instance = axios.create({
// 	baseURL: "http://192.168.43.81:5000/api",
// })

export {instance}