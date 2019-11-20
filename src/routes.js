import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/Components/Header';

import Sign from '~/pages/Sign';

import Checkin from '~/pages/Checkin';
import DashHelp from '~/pages/Help/DashHelp';
import NewHelp from '~/pages/Help/NewHelp';
import AnswerHelp from '~/pages/Help/AnswerHelp';

export default createAppContainer(
  createSwitchNavigator({
    Switch: createSwitchNavigator({
      Sign,
    }),
    Tab: createBottomTabNavigator(
      {
        Checkin: {
          screen: createStackNavigator(
            {
              Checkin,
            },
            {
              defaultNavigationOptions: {
                headerTintColor: '#fc2b6e',
                header: ({ navigation }) => <Header navigation={navigation} />,
              },
            }
          ),
          navigationOptions: {
            tabBarLabel: 'Chek-ins',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="edit-location" size={25} color={tintColor} />
            ),
          },
        },
        New: {
          screen: createStackNavigator(
            {
              DashHelp,
              NewHelp,
              AnswerHelp,
            },
            {
              defaultNavigationOptions: {
                header: ({ navigation }) => <Header navigation={navigation} />,
              },
            }
          ),
          navigationOptions: {
            tabBarLabel: 'Pedir ajuda',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="live-help" size={25} color={tintColor} />
            ),
          },
        },
      },
      {
        tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#fc2b6e',
          inactiveTintColor: '#c2c0c0',
          style: {
            backgroundColor: '#fafafa',
            height: 60,
            padding: 10,
          },
        },
      }
    ),
  })
);
