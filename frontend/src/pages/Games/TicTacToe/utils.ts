import { defaultPosition, EGameStatus } from "../../../store/slice/ticTacToe"
import { startGamePlay, movePlay } from "../../../utils/audio"
import { store } from "../../../store"

export const includes = (arrs: number[][], search: number[]) =>
  arrs.some((arr) => arr.every((n, i) => search.includes(n)))

export const checkAudio = (data: any) => {
  try {
    if (
      [EGameStatus.WAIT_X_MOVE, EGameStatus.WAIT_O_MOVE].includes(
        data?.status
      ) &&
      JSON.stringify(defaultPosition) === JSON.stringify(data?.position)
    ) {
      startGamePlay()
    } else if (
      JSON.stringify(defaultPosition) !== JSON.stringify(data?.position) &&
      JSON.stringify(store.getState().ticTacToe.position) !==
        JSON.stringify(data?.position)
    ) {
      movePlay()
    }
  } catch (e) {
    console.log(e)
  }
}
