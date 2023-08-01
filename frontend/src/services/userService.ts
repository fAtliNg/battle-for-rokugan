import { axiosInstance } from "../axios"

export interface ILoginPayload {
  login: string
  password: string
}

export interface ISignUpPayload {
  login: string
  password: string
}

export const signUpService = (data: ISignUpPayload) =>
  axiosInstance.post(`/api/auth/sign-up`, data)

export const loginService = (data: ILoginPayload) =>
  axiosInstance.post(`/api/auth/log-in`, data)
