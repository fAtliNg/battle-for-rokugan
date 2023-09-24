import { axiosInstance } from "../axios"
import { ITicTacToeState } from "../store/slice/ticTacToe"

interface IGameGetPayload {
  gameId: string
}

export const gameJoin = () => axiosInstance.get(`/api/tick-tack-toe/game/join`)

export const gameGet = (body: IGameGetPayload) =>
  axiosInstance.post(`/api/tick-tack-toe/game/get`, body)


export const move = (body: ITicTacToeState) =>
  axiosInstance.post(`/api/tick-tack-toe/game/move`, body)
