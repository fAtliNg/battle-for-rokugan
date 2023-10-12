import { call, put } from "redux-saga/effects"
import { ticTacToeActions } from "../slice/ticTacToe"
import {
  gameJoin,
  move,
  gameDelete,
  sendMessage,
} from "../../services/tiaTacToeService"

export function* searchGameStart() {
  try {
    const { data: gameId } = yield call(gameJoin)
    yield put(ticTacToeActions.setGameId(gameId))
    yield put(ticTacToeActions.checkGameId(gameId))
  } catch (e: any) {
    console.log(e)
  }
}

export function* moveStart({
  payload,
}: ReturnType<typeof ticTacToeActions.moveStart>): any {
  try {
    const { data } = yield call(move, payload)
    console.log(23235523, data)
    yield put(ticTacToeActions.moveSuccess(data.position))
  } catch (e: any) {
    console.log(e)
    yield put(ticTacToeActions.moveFail())
  }
}

export function* stopGame({
  payload,
}: ReturnType<typeof ticTacToeActions.stopGame>): any {
  try {
    yield put(ticTacToeActions.setSearch(false))
    yield call(gameDelete, payload)
  } catch (e: any) {
    console.log(e)
  }
}

export function* sendMessageSaga({
  payload,
}: ReturnType<typeof ticTacToeActions.sendMessage>): any {
  try {
    yield call(sendMessage, payload)
  } catch (e: any) {
    console.log(e)
  }
}
