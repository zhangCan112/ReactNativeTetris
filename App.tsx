/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react'
import { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Decorate from "./src/components/decorate";
import Keyboard from "./src/components/keyboard";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.app}>
      <Decorate></Decorate>
      <Keyboard></Keyboard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efcc19',
    borderRadius: 8
  },
});
