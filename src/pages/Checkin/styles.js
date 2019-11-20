import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fafafa;
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

export const ItemListCheckin = styled.View`
  height: 46px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 10px 30px;
  padding: 10px;
  background: #fff;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const NumberCheckin = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const DateCheckin = styled.Text`
  font-size: 14px;
  color: #a8a8a8;
`;
