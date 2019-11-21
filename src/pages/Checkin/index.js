import React, { useMemo, useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative, parseISO, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import {
  Container,
  Button,
  TextButton,
  ItemListCheckin,
  NumberCheckin,
  DateCheckin,
} from './styles';

function Checkin({ navigation, isFocused }) {
  const [students, setStudents] = useState([]);

  const student = navigation.getParam('student');

  async function loadCheckins() {
    console.log('entrou na funcao');
    const response = await api.get(`/students/${student.id}/checkins`);

    const data = response.data.checkins.map(date =>
      formatRelative(parseISO(date.createdAt), new Date(), {
        locale: pt,
      })
    );

    setStudents(data);
  }

  async function handleNewCheckin() {
    try {
      /* const validInterval = await api.get(`/students/${student.id}/checkins`);

      const interval =
        validInterval.data.checkins[validInterval.data.checkins.length - 1];

      console.log(interval.dt_checkin);
      console.log(subHours(new Date(), 1));
      if (interval.dt_checkin <= subHours(new Date(), 1)) {
        console.log('entrouqui');
        alert('Intevalo de checkins inválido');
      } else { */
      const response = await api.post(
        `/students/${student.student_id}/checkins`
      );
      setStudents(...students, response.data);
      loadCheckins();
    } catch (error) {
      alert('Limite de checkins na semana excedido');
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Container>
      <Button onPress={handleNewCheckin}>
        <TextButton>Novo check-in</TextButton>
      </Button>
      <FlatList
        data={students}
        keyExtractor={({ item }) => item}
        renderItem={item => (
          <ItemListCheckin>
            <NumberCheckin>Check-in #{item.index}</NumberCheckin>
            <DateCheckin>{item.item}</DateCheckin>
          </ItemListCheckin>
        )}
      />
    </Container>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={25} color={tintColor} />
  ),
};

export default withNavigationFocus(Checkin);
