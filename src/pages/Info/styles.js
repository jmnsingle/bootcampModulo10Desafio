import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fafafa;

  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Contain = styled.View`
  border-width: 1px;
  border-color: #fc2b6e;
  border-radius: 4px;
  padding: 10px 10px 30px 10px;
  margin: 30px;

  align-self: stretch;

  background: #fff;
`;

export const ContainTitle = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: #fc2b6e;
  padding: 10px;
  margin-bottom: 20px;

  align-self: stretch;
  align-items: center;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const ContainInfo = styled.View`
  align-self: stretch;
`;

export const ContainDesc = styled.View`
  flex-direction: row;
`;

export const Desc = styled.View`
  flex: 1;
`;

export const TextDesc = styled.Text`
  font-weight: ${props => (props.bold ? 'bold' : 600)};
  font-size: 16px;
`;

export const DescInfo = styled.View`
  flex: 1;
  align-items: flex-end;
`;
