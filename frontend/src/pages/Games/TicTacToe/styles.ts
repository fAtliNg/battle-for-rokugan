import styled from "styled-components"
import { ReactComponent as Board } from "./icons/board.svg"
import { ReactComponent as X } from "./icons/x.svg"
import { ReactComponent as O } from "./icons/o.svg"

export const RootStyled = styled.div`
  display: flex;
  text-align: center;
  gap: 32px;
  flex-direction: column;
  width: 300px;
  margin: auto;
`

export const WrapBoardStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`

export const BoardStyled = styled(Board)`
  position: absolute;
`

export const XStyled = styled(X)`
  position: relative;
  width: 87px;
  height: 87px;
`

export const OStyled = styled(O)`
  position: relative;
  width: 87px;
  height: 87px;
`

export const TableStyled = styled.table`
  z-index: 1;
  width: 268px;
  height: 267px;
`

export const TBodyStyled = styled.tbody``
export const TRStyled = styled.tr``
export const TDStyled = styled.td`
  cursor: pointer;
  width: 87px;
  height: 87px;
`

export const WinnerBannerStyled = styled.div`
  position: absolute;
  width: 268px;
  height: 267px;
  background: #4fd1c5;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WrapWinnerStyled = styled.div`
  display: flex;
  margin-top: 40px;
`
