import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Content = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 160px;
  width: 160px;
`;

export const Input = styled.TextInput`
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 30px;
  padding: 10px;
  font-size: 18px;

  align-self: stretch;
`;

export const Button = styled(RectButton)`
  height: 46px;
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
