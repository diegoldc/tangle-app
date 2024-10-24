import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const service = axios.create({
  baseURL: `${API_URL}/api`
})

service.interceptors.request.use((config) => {

  const authToken = localStorage.getItem("authToken")

  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`
  }

  return config

})

export default service