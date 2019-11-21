import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  ContentQuestionHeader,
  Question,
  QuestionTitle,
  QuestionDateHour,
  QuestionText,
  ContentAnswerHeader,
  Answer,
  AnswerTitle,
  AnswerDateHour,
  AnswerText,
} from './styles';

export default function AnswerHelp({ navigation }) {
  const help = navigation.getParam('help');

  const dateFormattedQuestion = formatRelative(
    parseISO(help.createdAt),
    new Date(),
    { locale: pt }
  );

  /* const dateFormattedAnswer = formatRelative(
    parseISO(help.answer_at),
    new Date(),
    { locale: pt }
  ); */

  return (
    <Container>
      <Content>
        <ContentQuestionHeader>
          <QuestionTitle>PERGUNTA</QuestionTitle>
          <QuestionDateHour>{dateFormattedQuestion}</QuestionDateHour>
        </ContentQuestionHeader>
        <Question>
          <QuestionText>{help.question}</QuestionText>
        </Question>
        <ContentAnswerHeader>
          <AnswerTitle>RESPOSTA</AnswerTitle>
          <AnswerDateHour>{JSON.stringify(help.answer_at)}</AnswerDateHour>
        </ContentAnswerHeader>
        <Answer>
          <AnswerText>{help.answer}</AnswerText>
        </Answer>
      </Content>
    </Container>
  );
}

AnswerHelp.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DashHelp');
      }}
    >
      <Icon name="chevron-left" size={35} color="#fc2b6e" />
    </TouchableOpacity>
  ),
});
