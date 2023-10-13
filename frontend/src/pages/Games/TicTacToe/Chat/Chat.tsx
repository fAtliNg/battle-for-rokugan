import React, {
  ChangeEvent,
  FC,
  memo,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react"
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
import { useMediaQuery } from "@chakra-ui/react"

export const Chat: FC = memo(() => {
  const dispatch = useDispatch()
  const { gameId, playerX, playerO, messages } = useSelector(
    (state: RootState) => state.ticTacToe
  )
  const { login } = useSelector((state: RootState) => state.userInfo)
  const [message, setMessage] = useState("")
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const [isLargerThan680] = useMediaQuery("(min-width: 680px)")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    setShowPlaceholder(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message) {
      dispatch(ticTacToeActions.sendMessage({ gameId, message }))
      setMessage("")
    }
  }

  if (!isLargerThan680 && (!gameId || !playerX || !playerO)) {
    return <></>
  }

  return (
    <RootStyled style={{ width: isLargerThan680 ? 350 : 268 }}>
      <MessagesStyled>
        {messages.map((message) => (
          <WrapMessageStyled currentUser={login === message.author}>
            <LoginStyled>{message.author}</LoginStyled>
            <MessageStyled>{message.message}</MessageStyled>
          </WrapMessageStyled>
        ))}
        <div ref={messagesEndRef} />
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
