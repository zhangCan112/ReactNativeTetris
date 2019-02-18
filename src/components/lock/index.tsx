import React, { Children } from 'react'
import { Component } from 'react';
import Number from '../number';
import { StyleSheet, Text, View, Image } from 'react-native';


let f0 = require('../../resource/images/db_0.png')
let f1 = require('../../resource/images/db_1.png')
let f2 = require('../../resource/images/db_2.png')
let f3 = require('../../resource/images/db_3.png') 

let frames = [f0,f1,f0,f1,f2,f3,f2,f3,f0,f1,f2,f3,f2,f3,f2,f3,f2,f3]

interface IProps {

}

interface IState {
    frameNo: number,    
}

export default class Time extends Component<IProps,IState> {
    
    constructor(props: IProps){
        super(props)
        this.state = {
            frameNo: 0,
        }
    }
    
    animateTimeInteral: number | null = null

    componentDidMount() {
        this.annimate()
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState){
        if (this.state.frameNo != nextState.frameNo) {
            return true
        }
        return false
    }

    componentWillUnmount() {
        if (this.animateTimeInteral) {
            clearTimeout(this.animateTimeInteral)            
        }        
    }

    render() {
        let cur = frames[this.state.frameNo%frames.length] 
        let imagesStyele = Math.round((this.state.frameNo + 1)/frames.length) %2 == 0 ? styles.images : styles.images_r   
        return (
            <View style={styles.container}>
            <Image style={imagesStyele} source={cur} width={50} height={44}></Image>
            <Text style={styles.title}>俄罗斯方块</Text>
            <Text style={styles.title}>TETRIS</Text>
            </View>
        );
    }
    
    annimate(){
       this.animateTimeInteral =  setInterval(()=>{
           this.setState({
               frameNo: this.state.frameNo + 1
           })           
       },150)
    }
}


const styles = StyleSheet.create({
    container: {        
        position: 'absolute',                                                  
        backgroundColor: 'rgba(0,0,0,0.1)',      
        width: '100%',
        height: '100%',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 70,                     
    },
    images: {
        width: 50,
        height: 44,
        marginBottom: 10,        
    },
    images_r: {
        width: 50,
        height: 44,
        marginBottom: 10,
        transform: [{ scaleX: -1},{translateX: 12}],
    },
    title: {
        fontSize: 15,
    }    
});