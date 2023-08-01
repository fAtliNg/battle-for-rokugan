import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import loginReducer from "./slice/loginSlice"
import { rootSaga } from "./sagas"
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage"
import { authInterceptor } from "./authInterceptor"

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    login: loginReducer,
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
    login: store.getState().login,
  })
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const getStore = () => store
