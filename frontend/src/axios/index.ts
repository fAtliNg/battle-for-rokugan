import axios from "axios"
import { store } from "../store"
import {routes} from "../constants";
import {userInfoActions} from "../store/slice/userInfoSlice";

export const axiosInstance = axios.create({
  baseURL: "/",
})

axiosInstance.interceptors.request.use(function (config) {
  const token = store.getState().userInfo.token
  config.headers["Auth-Token"] = token

  return config
})

axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    store.dispatch(userInfoActions.clear())
    window.location.pathname = routes.login
  }
  return error;
});
