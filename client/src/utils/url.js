import axios from "axios";

// const instance = axios.create({
// 	baseURL: "http://localhost:5000/api",
// })

const instance = axios.create({
	baseURL: "http://192.168.43.81:5000/api",
})

const ressourcesUrl = {
	profil: "http://192.168.43.81:5000/static/images/profil",
	postImages: "http://192.168.43.81:5000/static/images/post",
	postVideos: "http://192.168.43.81:5000/static/videos"
}

export {instance, ressourcesUrl}