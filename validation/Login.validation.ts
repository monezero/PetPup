import * as Yup from 'yup';

export type LoginForm = Yup.InferType<typeof LoginSchema>;

export const LoginSchema = Yup.object({
  email: Yup.string().email('Email Inválido').required('Email Obrigatório'),
  password: Yup.string().required('Senha Obrigatória'),
});
