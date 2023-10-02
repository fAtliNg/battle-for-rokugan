import { store } from "../store"

export const startGamePlay = () => {
  commonPlay("audioStartGame")
}

export const movePlay = () => {
  commonPlay("audioMove")
}

const commonPlay = (id: string) => {
  try {
    if (store.getState().common.canAudioPlay) {
      const el: any = document.getElementById(id)
      el.play()
    }
  } catch (e) {
    console.log(e)
  }
}
