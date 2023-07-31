import React, { FC, memo } from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
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

export const Login: FC = memo(() => {
  const navigate = useNavigate()

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
              <FormControl>
                <FormLabel>Логин</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField label="Пароль" />
            </Stack>
            <Stack spacing="6">
              <Button bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
                Войти
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
})
