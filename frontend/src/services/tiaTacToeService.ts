import { axiosInstance } from "../axios"
import { ITicTacToeState } from "../store/slice/ticTacToe"

interface IGameGetPayload {
  gameId: string
}

export const gameJoin = () => axiosInstance.get(`/api/game/join`)

export const gameGet = (body: IGameGetPayload) =>
  axiosInstance.get(`/api/game/get?gameId=${body.gameId}`)

export const gameDelete = (gameId: string) =>
  axiosInstance.delete(`/api/game/join?gameId=${gameId}`)

export const move = (body: ITicTacToeState) =>
  axiosInstance.put(`/api/game/move`, body)
