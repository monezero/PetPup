import { theme } from '@global/theme';
import styled from 'styled-components/native';

export const MenuContainer = styled.View`
  justify-content: flex-end;
  align-self: flex-end;
  margin-top: -80px;
  margin-left: 300px;
  height: 70px;
  width: 70px;
  background-color: ${theme.colors.gray_700};
  border-radius: 50px;
  border-color: black;
  border-width: 1px;
`;

export const MenuImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 50px;
`;
