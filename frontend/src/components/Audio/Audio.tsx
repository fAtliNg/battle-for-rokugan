import React from "react"
import { store } from "../../store"
import { commonActions } from "../../store/slice/common"

export const Audio = () => {
  document.addEventListener("click", function () {
    store.dispatch(commonActions.setCanAudioPlay(true))
  })

  return <></>
}
