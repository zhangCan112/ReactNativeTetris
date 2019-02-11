/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Children } from 'react'
import { Component } from 'react';
import {StyleSheet, Text, View } from 'react-native';

import Block from "../block";

export default class Keyboard extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text>我是键盘区</Text>
      <Block/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'pink'    
  },
});