import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled(RectButton).attrs({
  elevation: 2,
})`
  height: 150;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  margin: 15px 30px;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleHeader = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 4px;

  color: ${props => (props.color ? '#32a852' : '#a8a8a8')};
`;

export const DateHourHeader = styled.Text`
  flex: 1;
  text-align: right;
  margin-left: 15px;

  font-size: 16px;
  color: #a8a8a8;
`;

export const TextContent = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 16px;
  line-height: 25px;
  margin-top: 10px;
  color: #a8a8a8;
`;
