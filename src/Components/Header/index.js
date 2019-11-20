import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, LogoText } from './styles';

export default function Header() {
  return (
    <Container>
      <Icon name="fitness-center" size={30} color="#fc2b6e" />
      <LogoText>GYMPOINT</LogoText>
    </Container>
  );
}

Header.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate.goBack()}>
      <Icon name="chevron-left" size={30} color="#fc2b6e" />
    </TouchableOpacity>
  ),
});
