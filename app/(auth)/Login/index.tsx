import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import { LoginContainer, Logo } from './styles';

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
      <Logo source="@assets/PetPup.png" />
      <Input control={control} placeholder="Email" name="email" />
      <Input control={control} placeholder="Senha" password name="password" />
      <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
      <Button href="/Signup">Cadastre-se</Button>
    </LoginContainer>
  );
};

export default Login;
