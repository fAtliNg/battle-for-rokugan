import React, { FC, memo, useEffect, useState } from "react"
import { winPosition, includes, defaultPosition } from "./utils"
import {
  RootStyled,
  BoardStyled,
  TableStyled,
  TBodyStyled,
  TRStyled,
  TDStyled,
  XStyled,
  OStyled,
} from "./styles"
import { getMove } from "./minimax"

export const TicTacToe: FC = memo(() => {
  const [position, setPosition] = useState(defaultPosition)
  const [whoMove, setWhoMove] = useState("X")
  const [winner, setWinner] = useState("")

  useEffect(() => {
    if (whoMove === "O" && !winner) {
      const move = getMove(position, whoMove)
      let newPosition = [...position]
      newPosition[move[0]][move[1]] = whoMove
      setPosition(newPosition)
      setWhoMove("X")
      checkWinner()
    }
  }, [whoMove])

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
    if (position[row][item] || winner) {
      return
    }
    let newPosition = [...position]
    newPosition[row][item] = whoMove
    setPosition(newPosition)
    setWhoMove(whoMove === "X" ? "O" : "X")
    checkWinner()
  }

  return (
    <RootStyled>
      <BoardStyled />
      <TableStyled>
        <TBodyStyled>
          {position.map((row, rowIndex) => (
            <TRStyled>
              {row.map((item, itemIndex) => (
                <TDStyled onClick={() => onClickItem(rowIndex, itemIndex)}>
                  {item === "X" ? <XStyled /> : item === "O" ? <OStyled /> : ""}
                </TDStyled>
              ))}
            </TRStyled>
          ))}
        </TBodyStyled>
      </TableStyled>
    </RootStyled>
  )
})
