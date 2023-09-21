import { height, width } from '@global/constants';
import { theme } from '@global/theme';
import styled from 'styled-components/native';

export const HomeContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 0px 10px;
  background-color: ${theme.colors.blue_500};
`;
