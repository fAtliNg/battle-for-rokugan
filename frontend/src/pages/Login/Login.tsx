import React, { ChangeEvent, FC, memo, useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Logo } from "./Logo"
import { PasswordField } from "../../components/PasswordField/PasswordField"
import { useNavigate } from "react-router-dom"
import { routes } from "../../constants"
import { useDispatch, useSelector } from "react-redux"
import { loginActions } from "../../store/slice/loginSlice"
import { RootState } from "../../store"

export const Login: FC = memo(() => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state: RootState) => state.login)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    return () => {
      dispatch(loginActions.setError(""))
    }
  }, [])

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) =>
    setLogin(e.target.value)

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const onSubmit = () => {
    dispatch(loginActions.loginStart({ login, password }))
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading>Войдите в свой аккаунт</Heading>
            <Text color="fg.muted">
              У вас нет аккаунта?{" "}
              <Link
                color="blue.400"
                onClick={() => {
                  navigate(routes.signUp)
                }}
              >
                Зарегистрируйтесь
              </Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow="base"
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl
                isInvalid={!!error}
                isDisabled={isLoading}
                isRequired
              >
                <FormLabel>Логин</FormLabel>
                <Input value={login} onChange={onChangeLogin} />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>
              <PasswordField
                label="Пароль"
                value={password}
                onChange={onChangePassword}
                isDisabled={isLoading}
                isRequired
                isInvalid={!!error}
                error={error}
              />
            </Stack>
            <Stack spacing="6">
              <Button
                bg="blue.400"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={onSubmit}
                isLoading={isLoading}
                isDisabled={!login || !password}
              >
                Войти
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
})
