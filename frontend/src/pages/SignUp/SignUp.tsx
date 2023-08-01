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
import { routes } from "../../constants"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginActions } from "../../store/slice/loginSlice"
import { RootState } from "../../store"

export const SignUp: FC = memo(() => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state: RootState) => state.login)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    return () => {
      dispatch(loginActions.setError(""))
    }
  }, [])

  const onSubmit = () => {
    if (password && password === confirmPassword) {
      dispatch(loginActions.signUpStart({ password, login }))
    }
  }

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) =>
    setLogin(e.target.value)

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value)

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
            <Heading>Регистрация</Heading>
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
                isRequired
                isDisabled={isLoading}
                isInvalid={!!error}
              >
                <FormLabel>Логин</FormLabel>
                <Input value={login} onChange={onChangeLogin} />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}
              </FormControl>
              <PasswordField
                label="Пароль"
                value={password}
                onChange={onChangePassword}
                isRequired
                isInvalid={
                  !!password &&
                  !!confirmPassword &&
                  password !== confirmPassword
                }
                error="Пароли не совпадают"
                isDisabled={isLoading}
              />
              <PasswordField
                label="Подтвердите пароль"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                isRequired
                isInvalid={
                  !!password &&
                  !!confirmPassword &&
                  password !== confirmPassword
                }
                error="Пароли не совпадают"
                isDisabled={isLoading}
              />
            </Stack>
            <Stack spacing="6">
              <Button
                bg="blue.400"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={onSubmit}
                isDisabled={!login || !password || password !== confirmPassword}
                isLoading={isLoading}
              >
                Зарегистрироваться
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Text color="fg.muted">
              У вас уже есть аккаунт?{" "}
              <Link
                color="blue.400"
                onClick={() => {
                  navigate(routes.login)
                }}
              >
                Авторизуйтесь
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
})
