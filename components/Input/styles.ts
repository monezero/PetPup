import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

// Estilização do container da input
export const InputContainer = styled.View`
  background-color: white;
  flex-direction: row;
  align-items: center;
  padding-left: 4%;
  border-radius: 32px;
  width: 100%;
  min-height: 50px;
`;

export const ErrorMessage = styled.Text`
  font-size: 9px;

  color: ${({ theme }) => theme.colors.error};

  padding-top: 0.5%;
  padding-left: 3%;
`;

// Estilização do texto da input
export const TextInput = styled.TextInput`
  font-size: 16px;
  padding-left: 10px;
  width: 85%;
`;

export const TextInputMasked = styled(TextInputMask)`
  font-size: 16px;
  padding-left: 10px;
  width: 85%;
`;
