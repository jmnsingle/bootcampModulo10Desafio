import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { FlatList } from 'react-native';

import api from '~/services/api';
import Button from '~/components/Button';
import {
  Container,
  ItemListCheckin,
  NumberCheckin,
  DateCheckin,
} from './styles';

function Checkin({ isFocused }) {
  const student_id = useSelector(state => state.auth.student_id.id);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadCheckins() {
    const response = await api.get(`/checkins/${student_id}`);

    const data = response.data.checkins.map(date =>
      formatRelative(parseISO(date.createdAt), new Date(), {
        locale: pt,
      })
    );

    setStudents(data);
  }

  async function handleNewCheckin() {
    try {
      setLoading(true);
      const { data } = await api.post(`/checkins/${student_id}`);
      setStudents(...students, data);
      loadCheckins();
      setLoading(false);
      alert('Checkin realizado com sucesso !');
    } catch (error) {
      setLoading(false);
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
      <Button loading={loading} background="confirm" onPress={handleNewCheckin}>
        Novo check-in
      </Button>
      <FlatList
        data={students}
        keyExtractor={(item, index) => String(index)}
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

Checkin.propTypes = {
  isFocused: PropTypes.bool,
};

Checkin.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(Checkin);
