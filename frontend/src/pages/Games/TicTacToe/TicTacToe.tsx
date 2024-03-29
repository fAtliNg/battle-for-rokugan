import React, { FC, memo, useEffect } from "react"
import {
  RootStyled,
  BoardStyled,
  WrapBoardStyled,
  TableStyled,
  TBodyStyled,
  TRStyled,
  TDStyled,
  XStyled,
  OStyled,
  WinnerBannerStyled,
  WrapWinnerStyled,
  WrapPlayers,
  OSmallStyled,
  XSmallStyled,
  WinRatingStyled,
  LoseRatingStyled,
} from "./styles"
import { Button, Heading, Text, useMediaQuery } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, store } from "../../../store"
import {
  defaultRating,
  EGameStatus,
  IRatings,
  ticTacToeActions,
} from "../../../store/slice/ticTacToe"
import { WithSubnavigation } from "../../../components/NavBar"
import {
  EventSourceMessage,
  EventStreamContentType,
  fetchEventSource,
} from "@microsoft/fetch-event-source"
import { checkAudio } from "./utils"
import { movePlay } from "../../../utils/audio"
import { Chat } from "./Chat"
import { AllTimeScore } from "./AllTimeScore"

class RetriableError extends Error {}
class FatalError extends Error {}

export const TicTacToe: FC = memo(() => {
  const dispatch = useDispatch()
  const {
    isSearch,
    status,
    playerX,
    playerO,
    gameId,
    position: { fields: position },
    isLoading,
    rating,
  } = useSelector((state: RootState) => state.ticTacToe)
  const { login } = useSelector((state: RootState) => state.userInfo)
  const [isLargerThan1080] = useMediaQuery("(min-width: 1080px)")
  const [isLargerThan680] = useMediaQuery("(min-width: 680px)")

  const getWhoMove = () => {
    if (status === EGameStatus.WAIT_X_MOVE) {
      return "X"
    } else if (status === EGameStatus.WAIT_O_MOVE) {
      return "O"
    } else if (status === EGameStatus.UNKNOWN) {
      return EGameStatus.UNKNOWN
    }
    return ""
  }

  useEffect(() => {
    if (window.location.port === "3000") {
      return
    }
    const ctrl = new AbortController()
    fetchEventSource("/api/sse", {
      method: "GET",
      headers: {
        "Auth-Token": store.getState().userInfo.token,
      },
      openWhenHidden: true,
      signal: ctrl.signal,
      async onopen(response) {
        console.log("response:", response)
        console.log("content-type:", response.headers.get("content-type"))
        if (
          response.ok &&
          response.headers.get("content-type") === EventStreamContentType
        ) {
          return // everything's good
        } else if (
          response.status >= 400 &&
          response.status < 500 &&
          response.status !== 429
        ) {
          // client-side errors are usually non-retriable:
          throw new FatalError()
        } else {
          throw new RetriableError()
        }
      },
      onmessage(msg: EventSourceMessage) {
        console.log("onmessage")
        const playerX = store.getState().ticTacToe.playerX
        const playerO = store.getState().ticTacToe.playerO
        const data = JSON.parse(msg.data)
        console.log("SSE:", msg.event, data)
        if (msg.event === "GAME") {
          // const data = JSON.parse(msg.data)
          checkAudio(data)
          dispatch(ticTacToeActions.setSseData(data))
        }
        if (msg.event === "RATINGS") {
          const newRating: IRatings = {
            ratingX: 0,
            ratingO: 0,
            newRatingX: 0,
            newRatingO: 0,
          }
          if (data.firstPlayerLogin.toLowerCase() === playerX.toLowerCase()) {
            newRating.ratingX = data.firstPlayerOldRating
            newRating.newRatingX = data.firstPlayerNewRating
          }
          if (data.firstPlayerLogin.toLowerCase() === playerO.toLowerCase()) {
            newRating.ratingO = data.firstPlayerOldRating
            newRating.newRatingO = data.firstPlayerNewRating
          }
          if (data.secondPlayerLogin.toLowerCase() === playerX.toLowerCase()) {
            newRating.ratingX = data.secondPlayerOldRating
            newRating.newRatingX = data.secondPlayerNewRating
          }
          if (data.secondPlayerLogin.toLowerCase() === playerO.toLowerCase()) {
            newRating.ratingO = data.secondPlayerOldRating
            newRating.newRatingO = data.secondPlayerNewRating
          }

          dispatch(ticTacToeActions.setRatings(newRating))
        }
        if (msg.event === "CHAT") {
          // const data = JSON.parse(msg.data)
          dispatch(
            ticTacToeActions.addMessage({
              author: data?.author,
              message: data?.message,
            })
          )
          // console.log("SSE CHAT MESSAGE:", data)
        }
      },
      onclose() {
        console.log("onclose")
        // if the server closes the connection unexpectedly, retry:
        throw new RetriableError()
      },
      onerror(err) {
        console.log("error:", err)
        if (err instanceof FatalError) {
          throw err // rethrow to stop the operation
        } else {
          // do nothing to automatically retry. You can also
          // return a specific retry interval here.
        }
      },
    })
  }, [])

  const getWinner = () => {
    if (status === EGameStatus.X_WON) {
      return "X"
    } else if (status === EGameStatus.O_WON) {
      return "O"
    } else if (status === EGameStatus.DRAW) {
      return "DRAW"
    }
    return ""
  }

  const isFinishGame = () => {
    return (
      status === EGameStatus.O_WON ||
      status === EGameStatus.X_WON ||
      status === EGameStatus.DRAW
    )
  }

  useEffect(() => {
    if (isSearch) {
      document
        ?.getElementById?.("stopSearchButton")
        ?.removeAttribute("disabled")
    }
  }, [isSearch])

  const getNewPosition = (position: string[][], row: number, item: number) => {
    let position0 = [...position[0]]
    let position1 = [...position[1]]
    let position2 = [...position[2]]
    let newPosition = [position0, position1, position2]
    newPosition[row][item] = getWhoMove()

    return newPosition
  }

  const onClickItem = (row: number, item: number) => {
    if (
      position[row][item] !== "EMPTY" ||
      getWinner() ||
      !checkYourMove() ||
      isLoading
    ) {
      return
    }
    const newPosition = getNewPosition(position, row, item)
    console.log("movePayload:", {
      gameId,
      position: { fields: newPosition },
    })
    movePlay()
    dispatch(
      ticTacToeActions.moveStart({
        gameId,
        position: { fields: newPosition },
      })
    )
  }

  const onStartSearch = () => {
    dispatch(ticTacToeActions.searchGameStart())
    dispatch(ticTacToeActions.setRatings(defaultRating))
  }

  const onStopSearch = () => {
    dispatch(ticTacToeActions.stopGame(gameId))
  }

  const checkYourMove = () => {
    return (
      (status === EGameStatus.WAIT_X_MOVE && playerX === login) ||
      (status === EGameStatus.WAIT_O_MOVE && playerO === login)
    )
  }

  const checkWaitOpponentMove = () => {
    return (
      (status === EGameStatus.WAIT_X_MOVE && playerX !== login) ||
      (status === EGameStatus.WAIT_O_MOVE && playerO !== login)
    )
  }

  const renderNewRating = (oldRating: number, newRating?: number) => {
    if (!newRating) {
      return <></>
    } else if (oldRating < newRating) {
      return <WinRatingStyled> +{newRating - oldRating}</WinRatingStyled>
    } else if (oldRating > newRating) {
      return <LoseRatingStyled> {newRating - oldRating}</LoseRatingStyled>
    } else {
      return " +0"
    }
  }

  return (
    <>
      <WithSubnavigation />
      <RootStyled>
        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            flexDirection: isLargerThan680 ? undefined : "column-reverse",
            marginTop: 32,
          }}
        >
          {isLargerThan680 && <Chat />}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <WrapPlayers>
              {playerX && playerO && (
                <>
                  <div style={{ display: "flex" }}>
                    <XSmallStyled />
                    <Text fontSize="md">
                      {playerX} ({rating.ratingX})
                      {renderNewRating(rating.ratingX, rating.newRatingX)}
                    </Text>
                  </div>
                  <div style={{ display: "flex" }}>
                    <OSmallStyled />
                    <Text fontSize="md">
                      {playerO} ({rating.ratingO})
                      {renderNewRating(rating.ratingO, rating.newRatingO)}
                    </Text>
                  </div>
                </>
              )}
            </WrapPlayers>
            <WrapBoardStyled>
              <BoardStyled />
              <TableStyled>
                <TBodyStyled>
                  {position.map((row, rowIndex) => (
                    <TRStyled>
                      {row.map((item, itemIndex) => (
                        <TDStyled
                          onClick={() => onClickItem(rowIndex, itemIndex)}
                        >
                          {item === "X" ? (
                            <XStyled />
                          ) : item === "O" ? (
                            <OStyled />
                          ) : (
                            ""
                          )}
                        </TDStyled>
                      ))}
                    </TRStyled>
                  ))}
                </TBodyStyled>
              </TableStyled>
              {(getWinner() || !getWhoMove()) && isFinishGame() && (
                <WinnerBannerStyled>
                  <WrapWinnerStyled>
                    {(getWinner() === "X" ||
                      getWinner() === EGameStatus.DRAW) && <XStyled />}
                    {(getWinner() === "O" ||
                      getWinner() === EGameStatus.DRAW) && <OStyled />}
                  </WrapWinnerStyled>
                  <Heading as="h2" size="xl" noOfLines={1} color="green.900">
                    {getWinner() === EGameStatus.DRAW
                      ? "Ничья!"
                      : "Победитель!"}
                  </Heading>
                </WinnerBannerStyled>
              )}
            </WrapBoardStyled>
            {!isLargerThan680 && <Chat />}
            {!isSearch && !checkYourMove() && !checkWaitOpponentMove() && (
              <Button
                colorScheme="blue"
                onClick={onStartSearch}
                style={{ margin: "0px 16px", width: 236, alignSelf: "center" }}
              >
                Найти игру
              </Button>
            )}
            {isSearch && !checkYourMove() && !checkWaitOpponentMove() && (
              <div onClick={onStopSearch} style={{ display: "contents" }}>
                <Button
                  colorScheme="cyan"
                  isLoading
                  loadingText="Остановить"
                  // variant="outline"
                  spinnerPlacement="start"
                  isDisabled={false}
                  id="stopSearchButton"
                  variant="outline"
                  style={{
                    margin: "0px 16px",
                    width: 236,
                    alignSelf: "center",
                  }}
                />
              </div>
            )}
            {checkYourMove() && (
              <Heading as="h4" size="md">
                Ваш ход
              </Heading>
            )}
            {checkWaitOpponentMove() && (
              <Heading as="h4" size="md">
                Ждем ход соперника
              </Heading>
            )}
          </div>
          {isLargerThan1080 && <AllTimeScore />}
        </div>
      </RootStyled>
    </>
  )
})
