/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry, AsyncStorage} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from "./src/store";


import React from 'react'
import { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import { subscribeRecord , lastRecord} from './src/until/subscribe';
import states from './src/control/states';
 subscribeRecord(store)
 
 class Container extends Component {
   componentDidMount() {
     lastRecord()
     states.init()
   }
   
    render() {
      return (
        <Provider store={store}>
            <App></App>
        </Provider>
      );
    }
  }

AppRegistry.registerComponent(appName, () => Container);

