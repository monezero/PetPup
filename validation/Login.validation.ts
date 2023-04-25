import * as Yup from 'yup';

export type LoginForm = Yup.InferType<typeof LoginSchema>;
export type SignOnForm = Yup.InferType<typeof SignOnSchema>;

export const LoginSchema = Yup.object({
  email: Yup.string().email('Email Inválido').required('Email Obrigatório'),
  password: Yup.string().required('Senha Obrigatória'),
});

export const SignOnSchema = Yup.object({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().email('Email Inválido').required('Email obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
  confirmpassword: Yup.string()
    .required('Confirme a sua senha')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});
