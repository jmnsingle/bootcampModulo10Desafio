import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native';

import api from '~/services/api';
import Button from '~/components/Button';

import {
  Container,
  Content,
  ContentHeader,
  HeaderLeft,
  TitleHeader,
  DateHourHeader,
  TextContent,
} from './styles';

function DashHelp({ navigation, isFocused }) {
  const student_id = useSelector(state => state.auth.student_id.id);

  const [helps, setHelps] = useState([]);
  const [page, setPage] = useState(1);

  async function loadHelp() {
    const response = await api.get(`/help_orders/${student_id}/answer`, {
      params: {
        page,
      },
    });

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
        background="confirm"
        onPress={() => navigation.navigate('NewHelp')}
      >
        Novo pedido de auxílio
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
