import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #fafafa;
`;

export const TextInput = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 15,
  textAlignVertical: 'top',
  placeholderTextColor: '#ddd',
})`
  font-size: 18px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 15px 30px;
  line-height: 20px;
`;

export const Button = styled(RectButton).attrs({
  elevation: 2,
})`
  height: 50px;
  border-radius: 4px;
  margin: 15px 30px;
  background: #fc2b6e;

  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
