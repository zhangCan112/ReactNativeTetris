/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Children } from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


let nullImage = require('../../resource/images/num_null.png')

interface Iprops {
    maxLength?: number,
    text?: string,
}

export default class Number extends Component<Iprops> {
    
    render() {
        let maxLength = this.props.maxLength || 1
        let text = this.props.text || ''
        let textToImages = () => {
            let images:any[] = [nullImage,nullImage,nullImage,nullImage]
            let chars = text.split('')            
            for (let i = 0; i < maxLength; i++) {                
                                
            } 
            return images
        }               
        return (
            <View style={styles.container}>
            {
                textToImages().map((src, k) => (<Image style={styles.number} source={src} width={7} height={12} key={k}/>))
            }
            </View>
        );
    }

}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    number: {
        width: 7,
        height: 12,
    }
})