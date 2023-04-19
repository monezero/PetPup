import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React from 'react';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';

import { LoginContainer, OrView, SmallText } from './styles';

const SignUp = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<LoginForm>({
    // resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log('🚀 ~ file: index.tsx:16 ~ data:', data);
    router.replace('/Home');
  };

  return (
    <LoginContainer>
      <LogoSVG height={300} />
      <Input
        control={control}
        placeholder="Nome"
        name="email"
        iconLeft="person"
      />
      <Input
        control={control}
        placeholder="Email"
        name="email"
        iconLeft="email"
      />
      <Input
        control={control}
        placeholder="Senha"
        password
        name="password"
        iconLeft="lock"
      />
      <Input
        control={control}
        placeholder="Confirme sua senha"
        password
        name="password"
        iconLeft="lock"
      />
      <Button onPress={handleSubmit(onSubmit)}>Confirmar</Button>
    </LoginContainer>
  );
};

export default SignUp;
