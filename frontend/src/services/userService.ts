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
  axiosInstance.post(`/auth/sign-up`, data)

export const loginService = (data: ILoginPayload) =>
  axiosInstance.post(`/auth/log-in`, data)
