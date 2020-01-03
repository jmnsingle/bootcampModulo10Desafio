import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';

import SignIn from '~/pages/Sign';

import Info from '~/pages/Info';
import Checkin from '~/pages/Checkin';
import DashHelp from '~/pages/Help/DashHelp';
import NewHelp from '~/pages/Help/NewHelp';
import AnswerHelp from '~/pages/Help/AnswerHelp';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator(
          {
            Checkin: createStackNavigator(
              {
                Checkin,
              },
              {
                navigationOptions: {
                  tabBarLabel: 'Check-ins',
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="edit-location" size={20} color={tintColor} />
                  ),
                },
                defaultNavigationOptions: {
                  headerTitle: () => <Header />,
                },
              }
            ),
            Help: {
              screen: createStackNavigator(
                {
                  DashHelp,
                  NewHelp,
                  AnswerHelp,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Ajuda',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="live-help" size={20} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions: {
                    headerTitle: () => <Header />,
                    headerTitleContainerStyle: {
                      left: 0,
                    },
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
            },
            Info: createStackNavigator(
              {
                Info,
              },
              {
                navigationOptions: {
                  tabBarLabel: 'Perfil',
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="person" size={20} color={tintColor} />
                  ),
                },
                defaultNavigationOptions: {
                  headerTitle: () => <Header />,
                },
              }
            ),
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d64',
              inactiveTintColor: 'rgba(0,0,0,0.3)',
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
