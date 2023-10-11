import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@global/theme';
import { TouchableOpacity } from 'react-native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'GMAIL';

type Props = {
  type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  width: 100%;
  min-height: 45px;
  justify-content: center;
  align-items: center;
  background-color: ${({ type }) =>
    type === 'PRIMARY' ? theme.colors.yellow_500 : theme.colors.blue_500};
  border-radius: 10px;
  flex-direction: row;
  border-radius: 9px;
  margin-bottom: 18px;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: black;
  font-family: 'Roboto_400Regular';
`;

export const Icon = styled(AntDesign)`
  font-size: 25px;
  color: white;
  margin-left: 45px;
`;
