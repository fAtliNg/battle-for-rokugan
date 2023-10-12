import styled from "styled-components"

export const RootStyled = styled.div`
  width: 350px;
  height: 340px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export const MessagesStyled = styled.div`
  width: 100%;
  overflow: scroll;
`

export const WrapMessageStyled = styled.div`
  text-align: left;
  padding: 4px 12px;
`

export const LoginStyled = styled.span`
  font-weight: bold;
  padding: 0;
  color: #787878;
  letter-spacing: -1px;
  padding-right: 0.4em;
  max-width: 110px;
  text-overflow: ellipsis;
  display: inline-block;
  vertical-align: bottom;
`

export const MessageStyled = styled.span`
  color: #4d4d4d;
`

export const InputStyled = styled.input`
  border-top: 1px solid #d9d9d9;
  border-radius: 0;
  padding: 3px 20px 3px 4px;
  background: #fafaf9;
  color: #4d4d4d;
  outline-color: #1b78d0;
`
