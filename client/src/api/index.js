import { instance } from "../utils/url";

const insertToken = () => {
  const token = localStorage.getItem("tundah-token")

  instance.defaults.headers.common["authorization"] = `Bearer ${token}`

  return instance
}

export { insertToken }