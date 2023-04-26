import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React from 'react';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { LoginForm } from '@validation/Login.validation';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { LoginContainer, OrView, SmallText } from './styles';

const Login = () => {
  const router = useRouter();
  const forgotPassword = router.replace('/ForgotPassword');
  const { control, handleSubmit } = useForm<LoginForm>({
    // resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      if (!data.email || !data.password) {
        throw new Error('Por favor, preencha todos os campos');
      }

      console.log('🚀 ~ file: index.tsx:16 ~ data:', data);
      router.replace('/Home');
    } catch (error: Error) {
      console.error('Erro ao fazer login:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    }
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
      <Toast ref={ref => Toast.setRef(ref)} />
    </LoginContainer>
  );
};

export default Login;
