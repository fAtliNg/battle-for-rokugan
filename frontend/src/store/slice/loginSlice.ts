import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ILoginState {
  error: string
  isLoading: boolean
  token: string
  login: string
}

const initialState: ILoginState = {
  error: "",
  isLoading: false,
  token: "",
  login: "",
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart: (
      state,
      {}: PayloadAction<{ login: string; password: string }>
    ) => {
      state.isLoading = true
    },
    loginSuccess: (state, { payload }: PayloadAction<string>) => {
      state.token = payload
      state.isLoading = false
      state.error = ""
    },
    loginFail: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false
      state.error = payload
    },
    signUpStart: (
      state,
      {}: PayloadAction<{ login: string; password: string }>
    ) => {
      state.isLoading = true
    },
    signUpSuccess: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false
      state.token = payload
    },
    signUpFail: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false
      state.error = payload
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
    clear: () => {
      return initialState
    },
  },
})

export const loginActions = loginSlice.actions

export default loginSlice.reducer
