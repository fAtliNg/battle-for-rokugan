import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit"
import { routes } from "../constants"
import { loginActions } from "./slice/loginSlice"

const TOKEN_LIFETIME = 30 * 60 * 1000

export const authInterceptor: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (action.payload?.statusInfo?.statusCode === 401) {
      window.location.pathname = routes.login
    }
    if (action?.payload?.status === 401) {
      api.dispatch(loginActions.clear())
    }
    return next(action)
  }
