import { axiosInstance } from "../axios"

interface IGameGetPayload {
  gameId: string
}

export const gameJoin = () => axiosInstance.get(`/api/tick-tack-toe/game/join`)

export const gameGet = (body: IGameGetPayload) =>
  axiosInstance.post(`/api/tick-tack-toe/game/get`, body)
