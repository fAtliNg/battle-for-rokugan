import axios from "axios"
import { store } from "../store"

export const axiosInstance = axios.create({
  baseURL: "/",
})

axiosInstance.interceptors.request.use(function (config) {
  const token = store.getState().userInfo.token
  config.headers.token = token

  return config
})
