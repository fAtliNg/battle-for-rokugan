import { call, put, select } from "redux-saga/effects"

import { loginActions } from "../slice/loginSlice"
import { loginService, signUpService } from "../../services/userService"
import { routes } from "../../constants"

export function* loginStart({
  payload,
}: ReturnType<typeof loginActions.loginStart>): any {
  try {
    const {
      data: { token },
    } = yield call(loginService, payload)
    yield put(loginActions.loginSuccess(token))
    window.location.pathname = routes.main
  } catch (e: any) {
    yield put(loginActions.loginFail(e?.response?.data))
  }
}

export function* signUpStart({
  payload,
}: ReturnType<typeof loginActions.signUpStart>): any {
  try {
    const {
      data: { token },
    } = yield call(signUpService, payload)
    yield put(loginActions.signUpSuccess(token))
    window.location.pathname = routes.main
  } catch (e: any) {
    yield put(loginActions.signUpFail(e?.response?.data))
  }
}
