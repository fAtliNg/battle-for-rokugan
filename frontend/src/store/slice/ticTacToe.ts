import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum EGameStatus {
  WAIT_X_MOVE = "WAIT_X_MOVE",
  WAIT_O_MOVE = "WAIT_O_MOVE",
  UNKNOWN = "UNKNOWN",
}

interface ITicTacToeState {
  isSearch: boolean
  gameId: string
  playerO: string
  playerX: string
  status: EGameStatus
  position: string[][]
}

const initialState: ITicTacToeState = {
  isSearch: false,
  gameId: "",
  playerO: "",
  playerX: "",
  status: EGameStatus.UNKNOWN,
  position: [[], [], []],
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
    setPosition: (state, { payload }: PayloadAction<string[][]>) => {
      state.position = payload
    },
    clear: () => {
      return initialState
    },
  },
})

export const ticTacToeActions = ticTacToeSlice.actions

export default ticTacToeSlice.reducer
