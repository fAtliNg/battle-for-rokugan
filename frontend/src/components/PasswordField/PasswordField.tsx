import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react"
import React, { forwardRef, useRef } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"

interface IProps extends InputProps {
  label: string
  isRequired?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  error?: string
}

export const PasswordField = forwardRef<HTMLInputElement, IProps>(
  ({ label, isRequired, isDisabled, isInvalid, error, ...other }, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)
    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

    return (
      <FormControl
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
      >
        <FormLabel htmlFor="password">{label}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={mergeRef}
            name="password"
            type={isOpen ? "text" : "password"}
            autoComplete="current-password"
            required
            {...other}
          />
        </InputGroup>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  }
)

PasswordField.displayName = "PasswordField"
