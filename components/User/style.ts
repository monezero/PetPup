import { theme } from '@global/theme';
import styled from 'styled-components/native';

export const MenuView = styled.View`
  min-height: 100%;
  max-width: 100%;
  flex-direction: column;
`;

export const Menu = styled.View`
  height: 400px;
  width: 400px;
  background-color: ${theme.colors.gray_700};
  border-color: black;
  border-width: 1px;
`;

export const MenuImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 18px;
`;
