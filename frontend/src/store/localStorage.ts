import { RootState } from "./index"

export const saveToLocalStorage = (state: Partial<RootState>) => {
  try {
    const serialisedState = JSON.stringify(state)
    localStorage.setItem("persistentState", serialisedState)
  } catch (e) {
    console.warn(e)
  }
}

export const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistentState")
    if (serialisedState === null) return undefined
    return JSON.parse(serialisedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}
