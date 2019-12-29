import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fafafa;
`;

export const Content = styled.View`
  height: 400px;
  margin: 15px 30px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const ContentQuestionHeader = styled.View`
  padding: 10px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const QuestionTitle = styled.Text`
  font-size: 20;
  font-weight: bold;
`;

export const QuestionDateHour = styled.Text`
  flex: 1;
  text-align: right;
  margin-left: 15px;

  font-size: 16px;
  color: #a8a8a8;
`;

export const Question = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 10px;
`;

export const QuestionText = styled.Text`
  font-size: 16px;
  line-height: 20px;
  color: #a8a8a8;
`;
