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
import { StyleSheet, Text, View, Image } from 'react-native';
import Decorate from "./src/components/decorate";
import Keyboard from "./src/components/keyboard";
import Matrix from './src/components/matrix';
import { GlobalState, StateMapObject } from './src/reducers';
import states from './src/control/states';
import control from './src/control';
import Number from './src/components/number';
import Next from './src/components/next';
import Time from './src/components/time';


let soundOnSrc = './src/resource/images/music_on.png'
let soundOffSrc = './src/resource/images/music_off.png'

let pauseOnSrc = './src/resource/images/pause_on.png'
let pauseOffSrc = './src/resource/images/pause_off.png'

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
            {this.renderNumberPad()}
          </View>
        </Decorate>
        <Keyboard left={control.left} right={control.right} rotate={control.rotate}></Keyboard>
      </View>
    );
  }
  renderNumberPad = () => {
    let soundSrc = soundOffSrc
    let pauseSrc = pauseOnSrc
    return (<View style={padStyles.container}>
      <View style={padStyles.numbers}>
        <Text style={padStyles.title}>{'最高分'}</Text>
        <Number maxLength={6} text={'999'}></Number>
        <Text style={padStyles.title}>{'起始行'}</Text>
        <Number maxLength={6} text={'999'}></Number>
        <Text style={padStyles.title}>{'级别'}</Text>
        <Number maxLength={1} text={'999'}></Number>
        <Text style={padStyles.title}>{'下一个'}</Text>
        <Next shapeType={this.props.next} />
      </View>
      <View style={padStyles.statusBar}>
      <Image 
      source={require(soundSrc)} 
      style={padStyles.statusIcon} 
      width={padStyles.statusIcon.width}
      height={padStyles.statusIcon.height}/>
      <Image 
      source={require(pauseSrc)} 
      style={padStyles.statusIcon}
      width={padStyles.statusIcon.width}
      height={padStyles.statusIcon.height}/>
      <Time/>
      </View>      
    </View>)
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
    flexDirection: 'row',
    backgroundColor: '#9ead86',
    padding: 8,
    alignItems: 'stretch',
  },
});

const padStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 90,
    paddingLeft: 5,
    paddingRight: 5,
  },
  numbers: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 20,    
  },
  title: {
    paddingTop: 12,
    paddingBottom: 7,
    alignSelf: 'flex-start',
  },
  statusIcon: {
    width: 15,
    height: 12,
  }
})


const mapStateToProps = (state: GlobalState) => ({
  pause: state.get('pause') as StateMapObject['pause'],
  matrix: state.get('matrix') as StateMapObject['matrix'],
  next: state.get('next') as StateMapObject['next'],
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
function returnPropsType<FullProps>(func: (state: any) => FullProps) {
  return {} as FullProps
}

let mockGlobalProps = returnPropsType(mapStateToProps)

type GlobalProps = typeof mockGlobalProps
