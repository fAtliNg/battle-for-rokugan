import { all, takeLatest } from "redux-saga/effects"
import { loginActions } from "../slice/loginSlice"
import { loginStart, signUpStart } from "./loginSaga"

export function* rootSaga() {
  yield all([takeLatest(loginActions.loginStart, loginStart)])
  yield all([takeLatest(loginActions.signUpStart, signUpStart)])
}
