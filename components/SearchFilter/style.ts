import { theme } from '@global/theme';
import styled from 'styled-components/native';

export const ViewList = styled.View`
  flex-direction: row;
  width: 380px;
  height: 100px;
  background-color: white;
  border-color: black;
  border-width: 0.5px;
  border-left: solid;
  border-right: solid;
`;

export const TextList = styled.Text`
  font-size: 25px;
  margin-top: 5px;
  font-family: 'Roboto_400Regular';
  padding-left: 10px;
  width: 85%;
`;

export const ImageList = styled.Image`
  height: 100px;
  width: 100px;
`;
