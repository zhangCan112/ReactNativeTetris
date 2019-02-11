/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Children } from 'react'
import { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default class Decorate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftDecorate}></View>
        <View style={styles.centerDecorate}>
          <View style={styles.topBorder}>
            <View style={[styles.block, styles.longBlock]}/>
            <View style={styles.block}/>
            <View style={styles.block}/>
            <View style={styles.block}/>
            <View style={styles.block}/>
            <Text style={styles.title}>俄罗斯方块</Text>
            <View style={styles.block}/>
            <View style={styles.block}/>
            <View style={styles.block}/>
            <View style={styles.block}/>
            <View style={[styles.block, styles.longBlock]}/>
          </View>
          <View style={styles.children}>
            {this.props.children}
          </View>          
        </View>
        <View style={styles.rightDecorate}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
  },
  centerDecorate: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0000',
    borderTopWidth: 0,
    borderLeftWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 10,
    borderColor: 'black'
  },

  topBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,    
  },
  title: {
    fontSize: 15,        
  },
  block: {
    width:10,
    height:10,
    backgroundColor: 'black',
  },

  longBlock: {
    width: 40,
  },

  leftDecorate: {
    width: 40,
    backgroundColor: 'red'
  },
  rightDecorate: {
    width: 40,
    backgroundColor: 'green'
  },
  children: {
    flex: 1
  }
});