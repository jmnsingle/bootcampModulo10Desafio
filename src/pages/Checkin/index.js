import React, { useMemo, useState, useEffect } from 'react';
import { formatRelative, parseISO } from 'date-fns';
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

export default function Checkin({ navigation }) {
  const [students, setStudents] = useState([]);

  const student = navigation.getParam('student');

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/students/${student}`);

      const data = response.data.map(date =>
        formatRelative(parseISO(date.created_at), new Date(), {
          locale: pt,
        })
      );

      console.log(data);
      setStudents(data);
    }
    loadCheckins();
  });

  function handleNewCheckin() {
    const response = api.post(`/students/${student.student_id}/checkins`);

    console.log(response.data);

    setStudents(response.data);
  }

  return (
    <Container>
      <Button onPress={handleNewCheckin}>
        <TextButton>Novo check-in</TextButton>
      </Button>
      <FlatList
        data={students}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ItemListCheckin>
            <NumberCheckin>Check-in #{item.id}</NumberCheckin>
            <DateCheckin>{item.dateFormatted}</DateCheckin>
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
