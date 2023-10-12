import { axiosInstance } from "../axios"

interface IGameGetPayload {
  gameId: string
}

export interface IMoveRequest {
  gameId: string
  position: { fields: string[][] }
}

export interface ISendMessageRequest {
  gameId: string
  message: string
}

export const gameJoin = () => axiosInstance.get(`/api/game/join`)

export const gameGet = (body: IGameGetPayload) =>
  axiosInstance.get(`/api/game/get?gameId=${body.gameId}`)

export const gameDelete = (gameId: string) =>
  axiosInstance.delete(`/api/game/join?gameId=${gameId}`)

export const move = (body: IMoveRequest) =>
  axiosInstance.put(`/api/game/move`, body)

export const sendMessage = (body: ISendMessageRequest) =>
  axiosInstance.put(`/api/game/chat`, body, {
    headers: {
      "Game-Type": "Tic-Tac-Toe",
    },
  })
