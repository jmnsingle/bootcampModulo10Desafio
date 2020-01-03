import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  Content,
  ContentQuestionHeader,
  Question,
  QuestionTitle,
  QuestionText,
  QuestionDateHour,
} from './styles';

export default function AnswerHelp({ navigation }) {
  const help = navigation.getParam('help');
  const [create, setCreate] = useState('');
  const [update, setUpdate] = useState('');

  useEffect(() => {
    setCreate(
      formatRelative(parseISO(help.createdAt), new Date(), {
        locale: pt,
      })
    );
    if (help.answer_at) {
      setUpdate(
        formatRelative(parseISO(help.answer_at), new Date(), {
          locale: pt,
        })
      );
    }
  }, [help.answer_at, help.createdAt]);

  return (
    <Container>
      <Content>
        <ContentQuestionHeader>
          <QuestionTitle>PERGUNTA</QuestionTitle>
          <QuestionDateHour>{create}</QuestionDateHour>
        </ContentQuestionHeader>
        <Question>
          <QuestionText>{help.question}</QuestionText>
        </Question>
        <ContentQuestionHeader>
          <QuestionTitle>RESPOSTA</QuestionTitle>
          <QuestionDateHour>{update || 'Sem resposta'}</QuestionDateHour>
        </ContentQuestionHeader>
        <Question>
          <QuestionText>{help.answer}</QuestionText>
        </Question>
      </Content>
    </Container>
  );
}

AnswerHelp.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }),
};

AnswerHelp.defaultProps = {
  navigation: null,
};
