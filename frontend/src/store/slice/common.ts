import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ICommonState {
  canAudioPlay: boolean
}

const initialState: ICommonState = {
  canAudioPlay: false,
}

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCanAudioPlay: (state, { payload }: PayloadAction<boolean>) => {
      state.canAudioPlay = payload
    },
    clear: () => {
      return initialState
    },
  },
})

export const commonActions = commonSlice.actions

export default commonSlice.reducer
