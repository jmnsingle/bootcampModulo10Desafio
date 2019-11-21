import React, { useState, useEffect, useMemo } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native';

import api from '~/services/api';

import {
  Container,
  Button,
  TextButton,
  Content,
  ContentHeader,
  HeaderLeft,
  TitleHeader,
  DateHourHeader,
  TextContent,
} from './styles';

function DashHelp({ navigation, isFocused }) {
  const [helps, setHelps] = useState([]);

  async function loadHelp() {
    const response = await api.get(`/students/1/help_orders/answer`);

    const data = response.data.map(help => ({
      ...help,
      dateFormatted: formatRelative(parseISO(help.createdAt), new Date(), {
        locale: pt,
      }),
    }));
    setHelps(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Container>
      <Button
        onPress={() =>
          navigation.navigate('NewHelp', { student_id: helps[0].student_id })
        }
      >
        <TextButton>Novo pedido de auxílio</TextButton>
      </Button>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={helps}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Content
            onPress={() => navigation.navigate('AnswerHelp', { help: item })}
          >
            <ContentHeader>
              <HeaderLeft>
                <Icon
                  name="check-circle"
                  size={25}
                  color={item.answer ? '#32a852' : '#a8a8a8'}
                />
                <TitleHeader color={item.answer}>
                  {item.answer !== null ? 'Respondido' : 'Sem resposta'}
                </TitleHeader>
              </HeaderLeft>
              <DateHourHeader>{item.dateFormatted}</DateHourHeader>
            </ContentHeader>
            <TextContent>{item.question}</TextContent>
          </Content>
        )}
      />
    </Container>
  );
}

DashHelp.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={25} color={tintColor} />
  ),
};

export default withNavigationFocus(DashHelp);
