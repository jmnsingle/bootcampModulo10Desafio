import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Button from '~/components/Button';

import { Container, TextInput } from './styles';

export default function NewHelp({ navigation }) {
  const student_id = useSelector(state => state.auth.student_id.id);

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  async function handleQuestion() {
    if (question.length > 15) {
      setLoading(true);
      await api.post(`/help_orders/${student_id}/question`, {
        question,
      });
      setLoading(false);
      Alert.alert('Tudo certo', 'Pedido efetuado com sucesso!');
      navigation.navigate('DashHelp');
    } else {
      Alert.alert('Atenção', 'Pedido deve ter no mínimo 15 caracteres.');
    }
  }

  return (
    <Container>
      <TextInput
        placeholder="Digite seu pedido de auxílio"
        value={question}
        onChangeText={setQuestion}
      />
      <Button background="confirm" loading={loading} onPress={handleQuestion}>
        Enviar pedido
      </Button>
    </Container>
  );
}

NewHelp.navigationOptions = ({ navigation }) => ({
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
