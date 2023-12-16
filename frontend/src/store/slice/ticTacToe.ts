import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  IMoveRequest,
  ISendMessageRequest,
} from "../../services/tiaTacToeService"

export enum EGameStatus {
  WAIT_X_MOVE = "WAIT_X_MOVE",
  WAIT_O_MOVE = "WAIT_O_MOVE",
  X_WON = "X_WON",
  O_WON = "O_WON",
  DRAW = "DRAW",
  UNKNOWN = "UNKNOWN",
}

type TMessage = {
  author: string
  message: string
}

export interface ITicTacToeState {
  isSearch: boolean
  gameId: string
  playerO: string
  playerX: string
  status: EGameStatus
  position: { fields: string[][] }
  isLoading: boolean
  messages: TMessage[]
  rating: IRatings
}

export interface IRatings {
  ratingO: number
  ratingX: number
  newRatingO?: number
  newRatingX?: number
}

export const defaultPosition = {
  fields: [
    ["EMPTY", "EMPTY", "EMPTY"],
    ["EMPTY", "EMPTY", "EMPTY"],
    ["EMPTY", "EMPTY", "EMPTY"],
  ],
}

export const defaultRating: IRatings = {
  ratingO: 0,
  ratingX: 0,
  newRatingO: undefined,
  newRatingX: undefined,
}

const initialState: ITicTacToeState = {
  isSearch: false,
  gameId: "",
  playerO: "",
  playerX: "",
  status: EGameStatus.UNKNOWN,
  position: defaultPosition,
  isLoading: false,
  messages: [],
  rating: defaultRating,
}

export const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setSearch: (state, { payload }: PayloadAction<boolean>) => {
      state.isSearch = payload
    },
    searchGameStart: (state) => {
      state.isSearch = true
    },
    moveStart: (state, { payload }: PayloadAction<IMoveRequest>) => {
      state.position = payload.position
      if (state.status === EGameStatus.WAIT_X_MOVE) {
        state.status = EGameStatus.WAIT_O_MOVE
      }
      if (state.status === EGameStatus.WAIT_O_MOVE) {
        state.status = EGameStatus.WAIT_X_MOVE
      }
      state.isLoading = true
    },
    moveSuccess: (
      state,
      { payload }: PayloadAction<{ fields: string[][] }>
    ) => {
      state.position = payload
      state.isLoading = false
    },
    moveFail: (state) => {
      state.isLoading = false
    },
    setGameId: (state, { payload }: PayloadAction<string>) => {
      state.gameId = payload
    },
    setSseData: (
      state,
      {
        payload: { gameId, playerO, playerX, position, status },
      }: PayloadAction<Partial<ITicTacToeState>>
    ) => {
      state.gameId = gameId || ""
      state.playerO = playerO || ""
      state.playerX = playerX || ""
      if (position) {
        state.position = position
      }
      if (status) {
        state.status = status
      }
      if (
        status &&
        [
          EGameStatus.DRAW,
          EGameStatus.WAIT_X_MOVE,
          EGameStatus.WAIT_O_MOVE,
          EGameStatus.O_WON,
          EGameStatus.X_WON,
        ].includes(status)
      ) {
        state.isSearch = false
      }
    },
    checkGameId: (state, {}: PayloadAction<string>) => {},
    stopGame: (state, {}: PayloadAction<string>) => {
      return initialState
    },
    setPlayerX: (state, { payload }: PayloadAction<string>) => {
      state.playerX = payload
    },
    setPlayerO: (state, { payload }: PayloadAction<string>) => {
      state.playerO = payload
    },
    setStatus: (state, { payload }: PayloadAction<EGameStatus>) => {
      state.status = payload
      if (
        [
          EGameStatus.DRAW,
          EGameStatus.WAIT_X_MOVE,
          EGameStatus.WAIT_O_MOVE,
          EGameStatus.O_WON,
          EGameStatus.X_WON,
        ].includes(payload)
      ) {
        state.isSearch = false
      }
    },
    setPosition: (
      state,
      { payload }: PayloadAction<{ fields: string[][] }>
    ) => {
      state.position = payload
    },
    sendMessage: (state, {}: PayloadAction<ISendMessageRequest>) => {},
    addMessage: (state, { payload }: PayloadAction<TMessage>) => {
      state.messages = state.messages.concat(payload)
    },
    setRatings: (state, { payload }: PayloadAction<IRatings>) => {
      state.rating = payload
    },
    clear: () => {
      return initialState
    },
  },
})

export const ticTacToeActions = ticTacToeSlice.actions

export default ticTacToeSlice.reducer
