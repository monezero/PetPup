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

export const MenuText = styled.Text`
  padding-left: 10px;
  justify-content: center;
  font-family: ${theme.fonts.roboto_400};
  font-size: 22px;
  color: ${theme.colors.gray_500};
`;
export const MenuLine = styled.View`
  height: 1px;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray_700};
`;

export const MenuContainerVisible = styled.View`
  justify-content: center;
  padding-left: 16px;
  align-self: flex-end;
  margin-top: -68px;
  margin-left: 300px;
  height: 70px;
  width: 80px;
  background-color: ${theme.colors.blue_200};
  border-color: black;
  border-width: 1px;
`;
