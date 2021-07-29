import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps, InputGroup, Button, InputRightElement, FormErrorMessage } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, } from 'react';
import { useState } from 'react';

import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string,
  label?: string,
  activeShow?: boolean,
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, activeShow, error = null , type, ...rest }, ref) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel id="{name}" htmlFor={name}>{label}</FormLabel> }
      <InputGroup size="md">
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        type={activeShow && show ? 
                show ? "text" : "password"
                : type
        }
        _hover={{
          bgColor: "gray.900"
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {
        activeShow ?
        <InputRightElement width="4.5rem">
        <Button 
        h="1.75rem" size="sm" onClick={handleClick} margin='1'
        bottom='-3px'
        colorScheme="pink"
        focusBorderColor="pink.500"
        _focus={{
          borderColor: "pink.500"
        }}
        >
          {show ? "Ocultar" : "Mostrar"}
        </Button>
      </InputRightElement>
        :
        ''
      }
       </InputGroup>
       {
        !!error && (<FormErrorMessage>
          {error.message}
        </FormErrorMessage>)
      }
    </FormControl>
  )
}

export const Input = forwardRef(InputBase);