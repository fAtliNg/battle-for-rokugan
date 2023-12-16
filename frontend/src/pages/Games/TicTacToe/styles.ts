import styled from "styled-components"
import { ReactComponent as Board } from "./icons/board.svg"
import { ReactComponent as X } from "./icons/x.svg"
import { ReactComponent as O } from "./icons/o.svg"

export const RootStyled = styled.div`
  display: flex;
  text-align: center;
  gap: 32px;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
`

export const WrapBoardStyled = styled.div`
  display: flex;
  justify-content: center;
`

export const WrapPlayers = styled.div`
  //margin-top: 32px;
  //display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  padding: 0px 16px;
  width: 268px;
  align-self: center;
`

export const BoardStyled = styled(Board)`
  position: absolute;
`

export const XStyled = styled(X)`
  position: relative;
  width: 87px;
  height: 87px;
`

export const XSmallStyled = styled(X)`
  position: relative;
  width: 24px;
  height: 24px;
`

export const OStyled = styled(O)`
  position: relative;
  width: 87px;
  height: 87px;
`

export const OSmallStyled = styled(O)`
  position: relative;
  width: 24px;
  height: 24px;
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

export const WinRatingStyled = styled.span`
  color: rgb(135, 228, 58);
`
export const LoseRatingStyled = styled.span`
  color: rgb(245, 77, 98);
`
