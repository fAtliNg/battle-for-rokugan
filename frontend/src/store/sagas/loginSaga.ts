import { call, put, select } from "redux-saga/effects"

import { loginActions } from "../slice/loginSlice"
import { loginService, signUpService } from "../../services/userService"
import { routes } from "../../constants"
import {userInfoActions} from "../slice/userInfoSlice";

export function* loginStart({
  payload,
}: ReturnType<typeof loginActions.loginStart>): any {
  try {
    const {
      data: { token },
    } = yield call(loginService, payload)
    yield put(loginActions.loginSuccess())
    yield put(userInfoActions.setLogin(payload.login))
    yield put(userInfoActions.setToken(token))
    window.location.pathname = routes.ticTacToe
  } catch (e: any) {
    yield put(loginActions.loginFail(e?.response?.data?.message))
  }
}

export function* signUpStart({
  payload,
}: ReturnType<typeof loginActions.signUpStart>): any {
  try {
    const {
      data: { token },
    } = yield call(signUpService, payload)
    yield put(loginActions.signUpSuccess())
    yield put(userInfoActions.setLogin(payload.login))
    yield put(userInfoActions.setToken(token))
    window.location.pathname = routes.ticTacToe
  } catch (e: any) {
    yield put(loginActions.signUpFail(e?.response?.data?.message))
  }
}
