import { Flex, Button, Stack } from '@chakra-ui/react';
import {Input} from '../components/Form/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef } from 'react';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormScrema = yup.object().shape({
  email: yup.string().required('e-mail obrigatório'),
  password: yup.string().required('senha obrigatória'),
})

export default function Home() {
  const { register, handleSubmit, formState  } = useForm({
    resolver: yupResolver(signInFormScrema)
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (value) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(value);
  }

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >

      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input type="email" label="E-mail" error={errors.email} name="email" ref={searchInputRef}/>
          <Input activeShow={true} type="password" error={errors.password}  label="Senha" name="password" {...register('password')} />
        </Stack>

        <Button 
        type="submit"
        mt="6" 
        colorScheme="pink" 
        size="lg"
        isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

      </Flex>
    </Flex>
  )
}
