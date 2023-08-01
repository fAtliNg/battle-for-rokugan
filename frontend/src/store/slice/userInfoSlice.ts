import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ILoginState {
  token: string
  login: string
}

const initialState: ILoginState = {
  token: "",
  login: "",
}

export const userInfoSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, { payload }: PayloadAction<string>) => {
      state.login = payload
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload
    },
    clear: () => {
      return initialState
    },
  },
})

export const userInfoActions = userInfoSlice.actions

export default userInfoSlice.reducer
