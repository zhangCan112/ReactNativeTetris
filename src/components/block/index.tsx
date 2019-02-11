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

export interface IProps {
    color?: string,
    size?: number
}

export default class Block extends Component<IProps> {
    render() {        
        let styles = createStyles(this.props)
        return (
            <View style={[styles.container]}>
                <View style={[styles.center]} />
            </View>
        );
    }
}

const createStyles = (props: IProps) => {
    let color = props.color ? props.color : '#879372'
    let size = props.size ? props.size : 6
    return StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: size * 2,
            height: size * 2,
            padding: size / 3.,
            marginRight: size / 3.,
            marginBottom: size / 3.,
            borderWidth: size / 3.,
            borderStyle: 'solid',
            borderColor: color,
        },
        center: {
            width: size,
            height: size,
            backgroundColor: color,
        }
    });
}
