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
import { connect } from 'react-redux'
import {Platform, StyleSheet, Text, View} from 'react-native';
import Decorate from "./src/components/decorate";
import Keyboard from "./src/components/keyboard";
import Matrix from './src/components/matrix';
import { GlobalState, StateMapObject } from './src/reducers';
import states from './src/control/states';
import control from './src/control';

type Props = GlobalProps;
class App extends Component<Props> {

  componentDidMount() {
    states.start()
  }

  render() {
    return (
      <View style={styles.app}>
      <Decorate>
        <View style={styles.container}>
        <Matrix matrix={this.props.matrix} cur={this.props.cur}></Matrix>
        </View>
      </Decorate>
      <Keyboard left={control.left} right={control.right} rotate={control.rotate}></Keyboard>
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
  container: {
    backgroundColor: '#9ead86',
  }
});


const mapStateToProps = (state: GlobalState) => ({
  pause: state.get('pause') as StateMapObject['pause'],
  matrix: state.get('matrix') as StateMapObject['matrix'],
  next: state.get('next') as StateMapObject['matrix'],
  cur: state.get('cur') as StateMapObject['cur'],
  startLines: state.get('startLines') as StateMapObject['startLines'],
  clearLines: state.get('clearLines') as StateMapObject['clearLines'],
  points: state.get('points') as StateMapObject['points'],
  max: state.get('max') as StateMapObject['max'],
});
export default connect(mapStateToProps)(App)


/***
 * 实现全局props类型化
 */
function returnPropsType<FullProps>(func: (state: any)=>FullProps){
  return {} as FullProps
}

let mockGlobalProps = returnPropsType(mapStateToProps)

type GlobalProps =  typeof mockGlobalProps
