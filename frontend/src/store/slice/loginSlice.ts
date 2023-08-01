import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ILoginState {
  error: string
  isLoading: boolean
}

const initialState: ILoginState = {
  error: "",
  isLoading: false,
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
    loginSuccess: (state) => {
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
    signUpSuccess: (state) => {
      state.isLoading = false
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
