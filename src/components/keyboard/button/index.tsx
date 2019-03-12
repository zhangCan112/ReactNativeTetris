/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Children } from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import constValue from '../../../until/const'
let screenPoint = constValue.screenWidthPoint

export enum Direction {
    Up = 1,
    Left,
    Down,
    Right
}

export enum Size {
    S1 = 106,
    S2 = 66,
    S3 = 33,
}

export interface IProps {
    label: string,
    labelDirection?: Direction,
    colors: Array<string>,
    onPress?: (event: any) => void,
    size: Size,
    enableLongPress?: boolean,
    longPressInterval?: number,
}



export default class ControlButton extends Component<IProps> {
        
    componentWillUnmount() {
        if (this.longPressInterval) {
            clearTimeout(this.longPressInterval)
        }
    }

    render() {
let buttonStyle = createButtonStyle(this.props.size * screenPoint)
        let containerStyle = createContainerStyle(this.props)
        let labelSize = (this.props.size == Size.S1 || this.props.size == Size.S2) ? 17 : 12;
        return (
            <View style={containerStyle}>
                <TouchableOpacity onPress={this.props.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
                    <LinearGradient style={buttonStyle} colors={this.props.colors} />
                </TouchableOpacity>
                <Text style={{ fontSize: labelSize}}>{this.props.label}</Text>
            </View>
        );
    }
    
    longPressInterval: number | null = null

    onPressIn = (event: any) => {
        if (this.props.enableLongPress == true) {
            if (this.longPressInterval) {
                clearTimeout(this.longPressInterval)
            }
            this.longPressInterval = setInterval(()=>{
                if (this.props.onPress) {
                    this.props.onPress!(event)
                }
            }, this.props.longPressInterval || 200)
        }
        return null
    }

    onPressOut = () => {
        if (this.longPressInterval) {
            clearTimeout(this.longPressInterval)
        }
    }
    
}

const createContainerStyle = (props: IProps) => {
    let directionCreator = (labelDirection: Direction) => {
        switch (labelDirection) {
            case Direction.Up:
                return 'column-reverse'
            case Direction.Down:
                return 'column'
            case Direction.Left:
                return 'row-reverse'
            case Direction.Right:
                return 'row'
        }
    }
    return StyleSheet.create({
        container: {
            flexDirection: directionCreator(props.labelDirection ? props.labelDirection : Direction.Down),
            alignItems: 'center',                        
        }
    }).container;
}

const createButtonStyle = (width: number) => {
    return StyleSheet.create({
        button: {
            width: width,
            height: width,
            borderWidth: 1,
            backgroundColor: '#6e77ef',
            borderStyle: 'solid',
            borderColor: '#000',
            borderRadius: width / 2.,
        }
    }).button;
}