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

import Button, { Size } from "./button";

export default class Keyboard extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text>我是键盘区</Text>      
      <Button label='test' colors={['#6e77ef','#4652f3']} size={Size.S1}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    backgroundColor: 'pink'    
  },
});