import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react"
import { forwardRef, useRef } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"

interface IProps extends InputProps {
  label: string
  isRequired?: boolean
}

export const PasswordField = forwardRef<HTMLInputElement, IProps>(
  ({ label, isRequired, ...other }, ref) => {
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
      <FormControl isRequired={isRequired}>
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
      </FormControl>
    )
  }
)

PasswordField.displayName = "PasswordField"
