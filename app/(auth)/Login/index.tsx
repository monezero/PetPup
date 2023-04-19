import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React from 'react';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { LoginContainer, OrView, SmallText } from './styles';

const Login = () => {
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
      <SmallText>Esqueceu sua senha?</SmallText>
      <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
      <OrView />
      <Button href="/Signup">Cadastre-se</Button>
    </LoginContainer>
  );
};

export default Login;
