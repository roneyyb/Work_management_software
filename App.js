// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import Container from './src/container/stackcontainer';
import LoadScreen from './src/onLoad/LoadScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store, persistor} from './src/persistStore/persiststore';

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<LoadScreen />} persistor={persistor}>
            <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
            <Container />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
