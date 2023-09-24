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

export const TicTacToe: FC = memo(() => {
  const dispatch = useDispatch()
  const ref = useRef()
  const { isSearch, status, playerX, playerO } = useSelector(
    (state: RootState) => state.ticTacToe
  )
  const { login } = useSelector((state: RootState) => state.userInfo)
  const [position, setPosition] = useState(defaultPosition)
  const [whoMove, setWhoMove] = useState("X")
  const [winner, setWinner] = useState("")

  useEffect(() => {
    if (whoMove === "O" && !winner) {
      const move = getMove(position, whoMove)
      if (!move) {
        setWhoMove("")
        return
      }
      let newPosition = [...position]
      newPosition[move[0]][move[1]] = whoMove
      setPosition(newPosition)
      setWhoMove("X")
      checkWinner()
    }
  }, [whoMove])

  useEffect(() => {
    if (isSearch) {
      document
        ?.getElementById?.("stopSearchButton")
        ?.removeAttribute("disabled")
    }
  }, [isSearch])

  const checkWinner = () => {
    const xIndices: number[] = []
    const oIndices: number[] = []
    position.forEach((row, rowIndex) => {
      row.forEach((item, itemIndex) => {
        if (item === "X") {
          xIndices.push(rowIndex * 3 + itemIndex + 1)
        } else if (item === "O") {
          oIndices.push(rowIndex * 3 + itemIndex + 1)
        }
      })
      if (includes(winPosition, xIndices)) {
        setWinner("X")
      } else if (includes(winPosition, oIndices)) {
        setWinner("O")
      }
    })
  }

  const onClickItem = (row: number, item: number) => {
    if (position[row][item] || winner || !checkYourMove()) {
      return
    }
    let newPosition = [...position]
    newPosition[row][item] = whoMove
    setPosition(newPosition)
    setWhoMove(whoMove === "X" ? "O" : "X")
    checkWinner()
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
        {(winner || !whoMove) && (
          <WinnerBannerStyled>
            <WrapWinnerStyled>
              {(winner === "X" || !whoMove) && <XStyled />}
              {(winner === "O" || !whoMove) && <OStyled />}
            </WrapWinnerStyled>
            <Heading as="h2" size="xl" noOfLines={1} color="green.900">
              Победитель!
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
  )
})
