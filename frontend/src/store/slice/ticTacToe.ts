import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum EGameStatus {
  WAIT_X_MOVE = "WAIT_X_MOVE",
  WAIT_O_MOVE = "WAIT_O_MOVE",
  X_WON = "X_WON",
  O_WON = "O_WON",
  DRAW = "DRAW",
  UNKNOWN = "UNKNOWN",
}

export interface ITicTacToeState {
  isSearch: boolean
  gameId: string
  playerO: string
  playerX: string
  status: EGameStatus
  position: { fields: string[][] }
}

const defaultPosition = {
  fields: [
    ["EMPTY", "EMPTY", "EMPTY"],
    ["EMPTY", "EMPTY", "EMPTY"],
    ["EMPTY", "EMPTY", "EMPTY"],
  ],
}

const initialState: ITicTacToeState = {
  isSearch: false,
  gameId: "",
  playerO: "",
  playerX: "",
  status: EGameStatus.UNKNOWN,
  position: defaultPosition,
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
    moveStart: (state, {}: PayloadAction<ITicTacToeState>) => {},
    setGameId: (state, { payload }: PayloadAction<string>) => {
      state.gameId = payload
    },
    checkGameId: (state, {}: PayloadAction<string>) => {},

    setPlayerX: (state, { payload }: PayloadAction<string>) => {
      state.playerX = payload
    },
    setPlayerO: (state, { payload }: PayloadAction<string>) => {
      state.playerO = payload
    },
    setStatus: (state, { payload }: PayloadAction<EGameStatus>) => {
      state.status = payload
    },
    setPosition: (
      state,
      { payload }: PayloadAction<{ fields: string[][] }>
    ) => {
      state.position = payload
    },
    clear: () => {
      return initialState
    },
  },
})

export const ticTacToeActions = ticTacToeSlice.actions

export default ticTacToeSlice.reducer
