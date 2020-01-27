import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, ActivityIndicator } from 'react-native';

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
  Loading,
} from './styles';

function DashHelp({ navigation, isFocused }) {
  const student_id = useSelector(state => state.auth.student_id.id);

  const [helps, setHelps] = useState([]);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);

  async function loadHelp() {
    setLoading(true);
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
    setLoading(false);
  }

  async function pageRefresh() {
    setRefresh(true);
    const firstPage = 1;
    const { data: response } = await api.get(
      `/help_orders/${student_id}/answer`,
      {
        params: { page: firstPage },
      }
    );
    setHelps(response);
    setPage(firstPage);
    setMore(true);
    setRefresh(false);
  }

  async function loadMore() {
    setLoading(true);
    const newPage = page + 1;
    const { data: response } = await api.get(
      `/help_orders/${student_id}/answer`,
      {
        params: { page: newPage },
      }
    );
    if (more && response.length > 0) {
      const newData = [...helps, ...response];
      setHelps(newData);
      setPage(newPage);
      setLoading(false);
    } else {
      setLoading(false);
      setMore(false);
    }
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
        refreshing={refresh}
        onRefresh={pageRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (helps.length > 3) {
            loadMore();
          }
        }}
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
      {loading && (
        <Loading>
          <ActivityIndicator size="large" color="#fc2b6e" />
        </Loading>
      )}
    </Container>
  );
}

DashHelp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
  isFocused: PropTypes.bool.isRequired,
};

DashHelp.defaultProps = {
  navigation: null,
};

export default withNavigationFocus(DashHelp);
