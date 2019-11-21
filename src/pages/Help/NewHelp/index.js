import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, TextInput, Button, TextButton } from './styles';

export default function NewHelp({ navigation }) {
  const [question, setQuestion] = useState('');
  const student_id = navigation.getParam('student_id');

  async function handleQuestion() {
    if (question.length > 15) {
      await api.post(`/students/${student_id}/help_orders/question`, {
        question,
      });
      alert('Pedido efetuado com sucesso!');
      navigation.navigate('DashHelp');
    } else {
      alert('Pedido deve ter no mínimo 15 caracteres.');
    }
  }

  return (
    <Container>
      <TextInput
        placeholder="Digite seu pedido de auxílio"
        value={question}
        onChangeText={setQuestion}
      />
      <Button onPress={handleQuestion}>
        <TextButton>Enviar pedido</TextButton>
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
