/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Children } from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Block from "../block";


enum MatrixState {
  Hidden,
  Display
}

let H = MatrixState.Hidden
let D = MatrixState.Display

export default class Decorate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftDecorate}>
          {this.renderShapeBlock(
            [[H, D, D, H],
             [D, D, H, H]])}
          {this.renderShapeBlock(
            [[D, D, D, H],
             [H, D, H, H]])}
          {this.renderShapeBlock(
            [[H, D, D, H],
             [H, D, D, H]])}
          {this.renderShapeBlock(
            [[H, D, H, H],
             [D, D, D, H]])}
          {this.renderShapeBlock(
            [[D, H, H, H],
             [D, D, D, H]])}
          {this.renderShapeBlock(
            [[D, D, D, D],
             [H, H, H, H]])}      
        </View>
        <View style={styles.centerDecorate}>
          <View style={styles.topBorder}>
            <View style={[styles.block, styles.longBlock]} />
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.block} />
            <Text style={styles.title}>俄罗斯方块</Text>
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={styles.block} />
            <View style={[styles.block, styles.longBlock]} />
          </View>
          <View style={styles.children}>
            {this.props.children}
          </View>
        </View>
        <View style={styles.rightDecorate}>
        {this.renderShapeBlock(
            [[D, D, H, H],
             [H, D, D, H]])}
          {this.renderShapeBlock(
            [[H, D, H, H],
             [D, D, D, H]])}
          {this.renderShapeBlock(
            [[H, D, D, H],
             [H, D, D, H]])}
          {this.renderShapeBlock(
            [[D, D, D, H],
             [H, D, H, H]])}
          {this.renderShapeBlock(
            [[D, D, D, H],
             [D, H, H, H]])}
          {this.renderShapeBlock(
            [[H, H, H, H],
             [D, D, D, D]])}   
        </View>
      </View>
    );
  }

  //2行4列的2维数组来表示俄罗斯方块的形状
  renderShapeBlock = (matrix: MatrixState[][]) => {
    return (
      <View style={styles.shapeBlock}>
        {matrix.map((l: MatrixState[], i: number) => {
          return l.map((v: MatrixState, j: number ) => {
            return <Block key={`${i}+${j}`} color={v == D ? 'black' : 'rgba(0,0,0,0)'} />
          })
        })}
      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 4,
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
    width: 10,
    height: 10,
    backgroundColor: 'black',
  },

  longBlock: {
    width: 40,
  },

  leftDecorate: {
    width: 44,    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightDecorate: {
    width: 44,    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  children: {
    flex: 1
  },
  shapeBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: 20,
    height: 56,
    marginBottom: 10,
  }
});