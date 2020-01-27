import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import CodePush from 'react-native-code-push';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('079afa39-5484-48b1-bbbc-e6e70cfffd7b');

    OneSignal.addEventListener('received', this.onReceived );
    OneSignal.addEventListener('opened', this.onOpened );
    OneSignal.addEventListener('ids', this.onIds );

  }

  componentWillUnmount() {
    OneSignal.addEventListener('received', this.onReceived );
    OneSignal.addEventListener('opened', this.onOpened );
    OneSignal.addEventListener('ids', this.onIds );
  }

  onReceived = (data) => {

  }

  onOpened = (notification) => {

  }

  onIds = id => {}

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <App />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
