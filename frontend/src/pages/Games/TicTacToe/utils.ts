import { defaultPosition, EGameStatus } from "../../../store/slice/ticTacToe"
import { startGamePlay, movePlay } from "../../../utils/audio"
import { store } from "../../../store"

export const includes = (arrs: number[][], search: number[]) =>
  arrs.some((arr) => arr.every((n, i) => search.includes(n)))

export const checkAudio = (data: any) => {
  if (
    [EGameStatus.WAIT_X_MOVE, EGameStatus.WAIT_O_MOVE].includes(data?.status) &&
    JSON.stringify(defaultPosition) === JSON.stringify(data?.position)
  ) {
    startGamePlay()
  } else if (
    [
      EGameStatus.WAIT_X_MOVE,
      EGameStatus.WAIT_O_MOVE,
      EGameStatus.X_WON,
      EGameStatus.O_WON,
      EGameStatus.DRAW,
    ].includes(data?.status) &&
    JSON.stringify(defaultPosition) !== JSON.stringify(data?.position) &&
    JSON.stringify(store.getState().ticTacToe.position.fields) !==
      JSON.stringify(data?.position)
  ) {
    movePlay()
  }
}
