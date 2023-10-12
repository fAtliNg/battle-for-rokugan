import { all, takeLatest } from "redux-saga/effects"
import { loginActions } from "../slice/loginSlice"
import { loginStart, signUpStart } from "./loginSaga"
import {
  moveStart,
  searchGameStart,
  sendMessageSaga,
  stopGame,
} from "./ticTacToeSaga"
import { ticTacToeActions } from "../slice/ticTacToe"

export function* rootSaga() {
  yield all([takeLatest(loginActions.loginStart, loginStart)])
  yield all([takeLatest(loginActions.signUpStart, signUpStart)])

  yield all([takeLatest(ticTacToeActions.searchGameStart, searchGameStart)])
  yield all([takeLatest(ticTacToeActions.moveStart, moveStart)])
  yield all([takeLatest(ticTacToeActions.stopGame, stopGame)])
  yield all([takeLatest(ticTacToeActions.sendMessage, sendMessageSaga)])
}
