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

interface Iprops {
    maxLength?: number,
    text?: string,
}

let nullImg = require('../../resource/images/num_null.png')

export default class Number extends Component<Iprops> {
    
    render() {
        let maxLength = this.props.maxLength || 1
        let text = this.props.text || '10:15'
        let textToImages = () => {            
            let chars = text.split('')            
            let images = chars.map((c: string) => this.imgaeNumberSource(c)) 
            for (let i = 0; i < maxLength - chars.length; i++) {                
                images.unshift(nullImg)                                
            }
            return images
        }               
        return (
            <View style={styles.container}>
            {
                textToImages().map((src, k) => (<Image style={styles.number} source={src} width={9.5} height={16} key={k}/>))
            }
            </View>
        );
    }

    //图片数字map
  imgaeNumberSource  = (c: string) => {     
    switch (c) {
        case '0': return require('../../resource/images/num_0.png');
        case '1': return require('../../resource/images/num_1.png');
        case '2': return require('../../resource/images/num_2.png');
        case '3': return require('../../resource/images/num_3.png');
        case '4': return require('../../resource/images/num_4.png');
        case '5': return require('../../resource/images/num_5.png');
        case '6': return require('../../resource/images/num_6.png');
        case '7': return require('../../resource/images/num_7.png');
        case '8': return require('../../resource/images/num_8.png');
        case '9': return require('../../resource/images/num_9.png'); 
        case ':': return require('../../resource/images/num_colon_on.png');
        default:
            return nullImg
    }             
}

}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    number: {
        width: 9.5,
        height: 16,
    }
})