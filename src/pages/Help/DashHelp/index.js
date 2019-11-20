import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

// import { Container } from './styles';

export default function DashHelp() {
  return <View />;
}

DashHelp.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={25} color={tintColor} />
  ),
};
