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

import Button, { Size, Direction } from "./button";
import Arrows from "./arrows";
import constValue from '../../until/const'
let screenPoint = constValue.screenWidthPoint


interface IProps {
    left: (...args: any)=> void,
    right: (...args: any)=> void,
    rotate: (...args: any)=> void,
    pause: (...args: any)=> void,
    reset: (...args: any)=> void,
    down: (...args: any)=> void,
    space: (...args: any)=> void,
    music: (...args: any)=> void,
}

export default class Keyboard extends Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftArea}>
                    <View style={styles.leftSubTopArea}>
                        <Button label='暂停(P)' colors={['#4bc441', '#0ec400']} size={Size.S3} onPress={this.props.pause}/>
                        <Button label='音效(S)' colors={['#4bc441', '#0ec400']} size={Size.S3} onPress={this.props.music}/>
                        <Button label='重玩(R)' colors={['#dc3333', '#de0000']} size={Size.S3} onPress={this.props.reset}/>
                    </View>
                    <View style={styles.leftSubBottomArea}>
                        <Button label='掉落(SPACE)' colors={['#6e77ef', '#4652f3']} size={Size.S1} onPress={this.props.space}/>
                    </View>
                </View>
                <View style={styles.rightArea}>
                    <View style={controlBoxStyles.controlBox}>
                        <View style={controlBoxStyles.line1}>
                            <Button 
                            label='旋转' 
                            colors={['#6e77ef', '#4652f3']} 
                            size={Size.S2} 
                            labelDirection={Direction.Up} 
                            onPress={this.props.rotate}
                            enableLongPress={true}
                            longPressInterval={250}/>
                        </View>
                        <View style={controlBoxStyles.line2}>
                            <Button 
                            label='左移'
                             colors={['#6e77ef', '#4652f3']} 
                             size={Size.S2} 
                             labelDirection={Direction.Down} 
                             onPress={this.props.left}
                             enableLongPress={true}/>
                            <View style={controlBoxStyles.arrows}>
                            <Arrows></Arrows>
                            </View>
                            <Button 
                            label='右移' 
                            colors={['#6e77ef', '#4652f3']} 
                            size={Size.S2} 
                            labelDirection={Direction.Down} 
                            onPress={this.props.right}
                            enableLongPress={true}/>
                        </View>
                        <View style={controlBoxStyles.line3}>
                            <Button 
                            label='下移' 
                            colors={['#6e77ef', '#4652f3']} 
                            size={Size.S2}
                            onPress={this.props.down}
                            enableLongPress={true}/>
                            </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3.5,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 20,
    },
    leftArea: {
        flex: 0.7,
    },
    leftSubTopArea: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    leftSubBottomArea: {
        flex: 1,
        justifyContent: 'center',
    },
    rightArea: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const controlBoxStyles = StyleSheet.create({
    controlBox: {                
        
    },
    line1: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    line2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: Size.S2 * screenPoint,        
    },
    arrows: {
        width: 60,
    },
    line3: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});