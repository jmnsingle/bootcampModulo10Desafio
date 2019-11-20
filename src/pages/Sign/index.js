import React, { useState } from 'react';

import api from '~/services/api';
import logo from '~/assets/logo.png';
import { Container, Content, Logo, Input, Button, TextButton } from './styles';

export default function Sign({ navigation }) {
  const [student, setStudent] = useState('');

  async function handleSubmit() {
    try {
      const response = await api.get(`/students/${student}`);

      navigation.navigate('Checkin', { student: response.data });
    } catch (err) {
      console('erroaqui');
    }
  }

  return (
    <Container>
      <Content>
        <Logo source={logo} />
        <Input
          placeholder="Informe seu ID de cadastro"
          placeholderTextColor="#c2c0c0"
          autoCapitalize="none"
          keyboardType="numeric"
          autoCorrect={false}
          value={student}
          onChangeText={setStudent}
        />
        <Button onPress={handleSubmit}>
          <TextButton>Entrar no sistema</TextButton>
        </Button>
      </Content>
    </Container>
  );
}
