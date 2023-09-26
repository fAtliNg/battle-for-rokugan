import React, { FC, memo, useEffect, useRef, useState } from "react"
import { winPosition, includes, defaultPosition } from "./utils"
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
} from "./styles"
import { getMove } from "./minimax"
import { Button, Heading } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { EGameStatus, ticTacToeActions } from "../../../store/slice/ticTacToe"
import { WithSubnavigation } from "../../../components/NavBar"

export const TicTacToe: FC = memo(() => {
  const dispatch = useDispatch()
  const ref = useRef()
  const {
    isSearch,
    status,
    playerX,
    playerO,
    gameId,
    position: { fields: position },
  } = useSelector((state: RootState) => state.ticTacToe)
  const { login } = useSelector((state: RootState) => state.userInfo)

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
    if (position[row][item] !== "EMPTY" || getWinner() || !checkYourMove()) {
      return
    }
    const newPosition = getNewPosition(position, row, item)
    dispatch(
      ticTacToeActions.moveStart({
        gameId,
        playerO,
        position: { fields: newPosition },
        playerX,
        status,
        isSearch,
      })
    )
  }

  const onStartSearch = () => {
    dispatch(ticTacToeActions.searchGameStart())
  }

  const onStopSearch = () => {
    dispatch(ticTacToeActions.setSearch(false))
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

  return (
    <>
      <WithSubnavigation />
      <RootStyled>
        <WrapBoardStyled>
          <BoardStyled />
          <TableStyled>
            <TBodyStyled>
              {position.map((row, rowIndex) => (
                <TRStyled>
                  {row.map((item, itemIndex) => (
                    <TDStyled onClick={() => onClickItem(rowIndex, itemIndex)}>
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
                {(getWinner() === "X" || getWinner() === EGameStatus.DRAW) && (
                  <XStyled />
                )}
                {(getWinner() === "O" || getWinner() === EGameStatus.DRAW) && (
                  <OStyled />
                )}
              </WrapWinnerStyled>
              <Heading as="h2" size="xl" noOfLines={1} color="green.900">
                {getWinner() === EGameStatus.DRAW ? "Ничья!" : "Победитель!"}
              </Heading>
            </WinnerBannerStyled>
          )}
        </WrapBoardStyled>
        {!isSearch && !checkYourMove() && !checkWaitOpponentMove() && (
          <Button colorScheme="blue" onClick={onStartSearch}>
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
      </RootStyled>
    </>
  )
})
