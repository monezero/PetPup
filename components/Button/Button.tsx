import React, { PropsWithChildren } from 'react';

import { ViewStyle } from 'react-native';
import { Href } from 'expo-router/build/link/href';
import { useRouter } from 'expo-router';
import { ButtonText, ButtonTypeStyleProps, Container } from './styles';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  href?: Href;
  type?: ButtonTypeStyleProps;
}

/**
 * Componente de Botão padrão
 * @param onPress Função a ser executada ao clicar no botão
 * @param children Conteúdo do botão
 * @param href Caso passe href voce pode usar o botão como um link de redirecionamento
 */
export const Button = ({
  onPress,
  children,
  style,
  href,
  type,
}: PropsWithChildren<Props>) => {
  const router = useRouter();
  const handlePress = () => {
    if (onPress) {
      return onPress();
    }
    if (href) {
      return router.push(href);
    }
  };

  return (
    <Container onPress={handlePress} style={style} type={type ?? 'PRIMARY'}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};
