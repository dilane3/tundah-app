import axios from "axios";

// const instance = axios.create({
// 	baseURL: "http://localhost:5000/api"
// })

// const instance = axios.create({
// 	baseURL: "http://192.168.43.81:5000/api",
// })

const instance = axios.create({
  baseURL: "https://tundah-server.herokuapp.com/api",
});

// const instance = axios.create({
// 	baseURL: "http://localhost:3001/api"
// })

// const ressourcesUrl = {
// 	profil: "http://localhost:3001/static/images/profil",
// 	postImages: "http://localhost:3001/static/images/post",
// 	postVideos: "http://localhost:3001/static/videos"
// }

const ressourcesUrl = {
  profil: "https://tundah-server.herokuapp.com//static/images/profil",
  postImages: "https://tundah-server.herokuapp.com//static/images/post",
  postVideos: "https://tundah-server.herokuapp.com//static/videos",
};

// const ressourcesUrl = {
// 	profil: "http://192.168.43.81:5000/static/images/profil",
// 	postImages: "http://192.168.43.81:5000/static/images/post",
// 	postVideos: "http://192.168.43.81:5000/static/videos"
// }

// const ressourcesUrl = {
// 	profil: "http://localhost:5000/static/images/profil",
// 	postImages: "http://localhost:5000/static/images/post",
// 	postVideos: "http://localhost:5000/static/videos"
// }

export { instance, ressourcesUrl };
