import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@global/theme';

export const Container = styled.TouchableOpacity`
  width: 100%;
  min-height: 45px;
  justify-content: center;
  align-items: center;
  background-color: #fa2;
  border-radius: 10px;
  border-width: 2px;
  border-color: black;
  flex-direction: row;
  border-radius: 18px;
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
