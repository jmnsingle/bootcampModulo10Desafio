import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';
import { Container, Content, Logo, Input, Button, TextButton } from './styles';

import { sigInRequest } from '~/store/modules/auth/actions';

export default function Sign() {
  const loading = useSelector(state => state.auth.loading);
  const dispath = useDispatch();

  const [studentId, setStudentId] = useState('');

  function handleSubmit() {
    dispath(sigInRequest(studentId));
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
          value={studentId}
          onChangeText={setStudentId}
        />
        <Button onPress={() => handleSubmit()}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <TextButton>Entrar no sistema</TextButton>
          )}
        </Button>
      </Content>
    </Container>
  );
}
