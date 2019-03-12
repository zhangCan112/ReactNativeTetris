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


export default class Arrows extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.box}>
              <View style={styles.line1}>
                    <View style={[arrowStyles.arrow, arrowStyles.up]}></View>
                </View>
                <View style={styles.line2}>
                    <View style={styles.line2_left}>
                    <View style={[arrowStyles.arrow, arrowStyles.left]}></View>
                    </View>
                    <View style={styles.line2_right}>
                   <View style={[arrowStyles.arrow, arrowStyles.right]}></View>
                   </View>
                </View>
                <View style={styles.line3}>
                    <View style={[arrowStyles.arrow, arrowStyles.down]}></View>
                </View>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',        
        justifyContent: 'center',
    },
    box: {                
        flex: 1,                   
    },
    line1: {
        flex: 1,        
        flexDirection: 'row',
        justifyContent: 'center',          
        overflow: 'hidden'      
    },
    line2: {
        flex: 1,
        flexDirection: 'row',        
        justifyContent: 'space-between',          
    },
    line2_left: {
        flex: 1,
        flexDirection: 'row',        
        justifyContent: 'flex-start',    
        alignItems: 'center',        
        overflow: 'hidden'
    },
    line2_right: {
        flex: 1,
        flexDirection: 'row',        
        justifyContent: 'flex-end',        
        alignItems: 'center',      
        overflow: 'hidden'   
    },
    line3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',        
        overflow: 'hidden'
    },
});

const arrowStyles = StyleSheet.create({
    arrow: {        
        width: 0,
        height: 0,
        borderColor: 'transparent',                
    },
    up: {
        borderLeftWidth: 19,        
        borderRightWidth: 19,
        borderBottomWidth: 44,        
        borderBottomColor: 'black'        
    },
    left: {
        borderTopWidth: 19,
        borderBottomWidth: 19,        
        borderRightWidth: 44,
        borderRightColor: 'black'
    },
    right: {            
        borderTopWidth: 19,
        borderBottomWidth: 19,
        borderLeftWidth: 44,                                 
        borderLeftColor: 'black',                      
    },
    down: {
        borderLeftWidth: 19,
        borderRightWidth: 19,
        borderTopWidth: 44,
        borderTopColor: 'black'
    }
});