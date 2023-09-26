import { axiosInstance } from "../axios"
import { ITicTacToeState } from "../store/slice/ticTacToe"

interface IGameGetPayload {
  gameId: string
}

export const gameJoin = () => axiosInstance.get(`/api/tick-tack-toe/game/join`)

export const gameGet = (body: IGameGetPayload) =>
  axiosInstance.get(`/api/tick-tack-toe/game/get?gameId=${body.gameId}`)

export const gameDelete = (gameId: string) =>
  axiosInstance.delete(`/api/tick-tack-toe/game/join?gameId=${gameId}`)

export const move = (body: ITicTacToeState) =>
  axiosInstance.put(`/api/tick-tack-toe/game/move`, body)
