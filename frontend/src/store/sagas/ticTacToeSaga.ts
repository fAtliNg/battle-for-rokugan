import { call, put, select, delay } from "redux-saga/effects"
import { EGameStatus, ticTacToeActions } from "../slice/ticTacToe"
import {
  gameGet,
  gameJoin,
  move,
  gameDelete,
} from "../../services/tiaTacToeService"
import {store} from "../index";

export function* searchGameStart() {
  try {
    const { data: gameId } = yield call(gameJoin)
    yield put(ticTacToeActions.setGameId(gameId))
    yield put(ticTacToeActions.checkGameId(gameId))
  } catch (e: any) {
    console.log(e)
  }
}

export function* checkGameIdStart({
  payload,
}: ReturnType<typeof ticTacToeActions.checkGameId>): any {
  try {
    const { login } = yield select((state) => state.userInfo)
    const { data } = yield call(gameGet, { gameId: payload })
    yield put(ticTacToeActions.setPlayerX(data.playerX))
    yield put(ticTacToeActions.setPlayerO(data.playerO))
    yield put(ticTacToeActions.setStatus(data.status))
    yield put(ticTacToeActions.setPosition(data.position))
    if (!data.playerX || !data.playerO) {
      yield delay(1000)
      if (store.getState().ticTacToe.isSearch) {
        yield put(ticTacToeActions.checkGameId(payload))
      }
    } else {
      yield put(ticTacToeActions.setSearch(false))
    }
    if (
      (data.status === EGameStatus.WAIT_X_MOVE && data.playerX !== login) ||
      (data.status === EGameStatus.WAIT_O_MOVE && data.playerO !== login)
    ) {
      yield delay(1000)
      yield put(ticTacToeActions.checkGameId(payload))
    }
  } catch (e: any) {
    console.log(e)
  }
}

export function* moveStart({
  payload,
}: ReturnType<typeof ticTacToeActions.moveStart>): any {
  try {
    yield call(move, payload)
    yield put(ticTacToeActions.checkGameId(payload.gameId))
  } catch (e: any) {
    console.log(e)
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
