import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';

export const Container = styled.TouchableOpacity`
  width: 100%;
  min-height: 45px;
  justify-content: center;
  align-items: center;
  background-color: #fa2;
  border-radius: 10px;
  flex-direction: row;
  border-radius: 18px;
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const Icon = styled(AntDesign)`
  font-size: 25px;
  color: white;
  margin-left: 45px;
`;
