import React, { ChangeEvent, FC, memo, useState, KeyboardEvent } from "react"
import {
  InputStyled,
  LoginStyled,
  MessagesStyled,
  MessageStyled,
  RootStyled,
  WrapMessageStyled,
} from "./styles"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../store"
import { ticTacToeActions } from "../../../../store/slice/ticTacToe"

export const Chat: FC = memo(() => {
  const dispatch = useDispatch()
  const { gameId, playerX, playerO, messages } = useSelector(
    (state: RootState) => state.ticTacToe
  )
  const [message, setMessage] = useState("")
  const [showPlaceholder, setShowPlaceholder] = useState(true)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    setShowPlaceholder(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(ticTacToeActions.sendMessage({ gameId, message }))
      setMessage("")
    }
  }

  return (
    <RootStyled>
      <MessagesStyled>
        {messages.map((message) => (
          <WrapMessageStyled>
            <LoginStyled>{message.author}</LoginStyled>
            <MessageStyled>{message.message}</MessageStyled>
          </WrapMessageStyled>
        ))}
      </MessagesStyled>
      <InputStyled
        placeholder={showPlaceholder ? "Будьте вежливы в чате!" : ""}
        value={message}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={!gameId || !playerO || !playerX}
      />
    </RootStyled>
  )
})
