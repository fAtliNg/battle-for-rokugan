import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import loginReducer from "./slice/loginSlice"
import userInfoReducer from "./slice/userInfoSlice"
import { rootSaga } from "./sagas"
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage"
import { authInterceptor } from "./authInterceptor"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    login: loginReducer,
    userInfo: userInfoReducer,
  },
  preloadedState: loadFromLocalStorage(),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: true })
      .concat(authInterceptor)
      .prepend(sagaMiddleware)
  },
})

store.subscribe(() => {
  saveToLocalStorage({
    userInfo: store.getState().userInfo,
  })
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const getStore = () => store
