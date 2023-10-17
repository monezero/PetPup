import { Button } from '@components/Button/Button';
import Input from '@components/Input/Input';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import LogoSVG from '@assets/LogoSVG.svg';
import { useForm } from 'react-hook-form';
import { LoginForm, LoginSchema } from '@validation/Login.validation';
import { useRouter, Link } from 'expo-router';
import Toast from 'react-native-toast-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { FIREBASE_AUTH } from '@services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoginBox, LoginContainer, OrView } from './styles';

interface ILogin {
  promptAsync: () => void;
}

const Login = ({ promptAsync }: ILogin) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      router.replace('/Home');
    } catch (error: Error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error ao fazer login',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };
  console.log('promptAsync', promptAsync);
  return (
    <LoginContainer>
      <LogoSVG height={400} />

      <LoginBox behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Input
          control={control}
          placeholder="Email"
          value={email}
          name="email"
          iconLeft="email"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
        <Input
          control={control}
          placeholder="Senha"
          value={password}
          password
          name="password"
          iconLeft="lock"
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
        />

        <Link
          href="/ForgotPassword"
          style={{
            alignSelf: 'flex-end',
            marginBottom: 10,
            fontFamily: 'Roboto_700Bold',
            color: '#fff',
            fontSize: 18,
          }}
        >
          Esqueceu sua senha?
        </Link>
        <Button onPress={signIn} type="PRIMARY">
          Entrar
        </Button>
        <OrView />
        <Button onPress={() => promptAsync()} type="GMAIL">
          Entrar com Gmail
        </Button>
        <Button href="/Signup" type="PRIMARY">
          Cadastre-se
        </Button>
        <Toast ref={ref => Toast.setRef(ref)} />
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
