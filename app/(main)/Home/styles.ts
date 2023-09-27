import { height, width } from '@global/constants';
import { theme } from '@global/theme';
import styled from 'styled-components/native';

export const HomeContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 0px 10px;
  background-color: ${theme.colors.blue_500};
`;

export const HomeText = styled.Text`
  padding-left: 8px;
  padding-bottom: 10px;
  font-size: 22px;
  font-family: ${theme.fonts.roboto_700};
  color: white;
`;
