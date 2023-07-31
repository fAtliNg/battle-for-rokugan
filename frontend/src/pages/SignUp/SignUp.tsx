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

export const SignUp: FC = memo(() => {
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
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl isRequired>
                <FormLabel>Логин</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField label="Пароль" isRequired />
              <PasswordField label="Подтвердите пароль" isRequired />
            </Stack>
            <Stack spacing="6">
              <Button bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
                Зарегистрироваться
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
})
