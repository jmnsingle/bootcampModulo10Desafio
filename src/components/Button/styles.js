import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const backgrounds = {
  confirm: css`
    background: #fc2b6e;
  `,

  success: css`
    background: #488746;
  `,

  cancel: css`
    background: #d6133e;
  `,
};

export const Container = styled(RectButton)`
  height: 46px;
  border-radius: 4px;
  margin: 15px 30px;

  align-self: stretch;
  align-items: center;
  justify-content: center;
  ${props => backgrounds[props.background]}
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
