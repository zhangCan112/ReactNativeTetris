import React, { Children } from 'react'
import { Component } from 'react';
import Number from '../number';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {

}

interface IState {
    date: Date,    
}
let timeInterval = 0

export default class Time extends Component<IProps,IState> {
    
    constructor(props: IProps){
        super(props)
    }
    

    render() {
        return (
            <View style={styles.container}></View>
        );
    }     
}


const styles = StyleSheet.create({
    container: {        
        position: 'absolute',
        flex: 1,
        alignSelf: 'stretch',                                  
        backgroundColor: 'rgba(0,0,0,0.7)',      
        width: '100%',
        height: '100%',               
    },
});