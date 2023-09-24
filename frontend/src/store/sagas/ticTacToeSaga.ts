import { call, put, select, delay } from "redux-saga/effects"
import { ticTacToeActions } from "../slice/ticTacToe"
import { gameGet, gameJoin } from "../../services/tiaTacToeService"

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
    const { data } = yield call(gameGet, { gameId: payload })
    console.log(2323243, data)
    yield put(ticTacToeActions.setPlayerX(data.playerX))
    yield put(ticTacToeActions.setPlayerO(data.playerO))
    yield put(ticTacToeActions.setStatus(data.status))
    yield put(ticTacToeActions.setPosition(data.position))
    if (!data.playerX || !data.playerO) {
      yield delay(1000)
      yield put(ticTacToeActions.checkGameId(payload))
    } else {
      yield put(ticTacToeActions.setSearch(false))
    }
    console.log(243, data)
  } catch (e: any) {
    console.log(e)
  }
}
