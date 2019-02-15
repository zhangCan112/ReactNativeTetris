/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Block from '../block';
import { List } from 'immutable';

import constValue, { MatrixPoint } from '../../until/const'
import MatrixManager from '../../control/matrixManager';
import TetrisBlock from '../../control/tetrisBlock';
import states from '../../control/states';
import { number } from 'prop-types';



interface IProps {
    matrix: List<List<MatrixPoint>>,
    cur?: TetrisBlock
}

interface IState {
    clearLins: number[],
    animateColor: '#560000' | '#000000',
    animateStep: number,
    animateOver: boolean,    
}


export default class Matrix extends Component<IProps, IState> {
    
    constructor(props: IProps){
        super(props)
        this.state = {
            clearLins: [],
            animateColor: '#000000',
            animateStep: 0,
            animateOver: true,
        }
    }


    componentWillReceiveProps(nextPros: IProps) {
        let isClear = MatrixManager.isClear(nextPros.matrix)            
        if (isClear !== false && this.state.animateOver) {
            let clears  = isClear as number[]
            if (clears.length > 0) {                
                this.clearAnimate(clears)   
            }            
        }               
    }

    //
    clearAnimate = (clears: number[]) => {        
        let onceAnimate = () => { 
            if (this.state.animateStep > 3) {//动画结束
                let lines  = this.state.clearLins                
                this.setState({
                    ...this.state,
                    clearLins: [],
                    animateStep: 0,
                    animateColor: '#000000',
                    animateOver: true                    
                })                               
                states.clearLines(lines) 
            } else {
                this.setState({
                    ...this.state,
                    animateStep: this.state.animateStep + 1,
                    animateColor: this.state.animateColor == '#000000' ? '#560000' : '#000000'                                        
                })
                setTimeout(onceAnimate, 100)
            }                       
        }                

        this.setState({
            clearLins: clears,
            animateColor: '#000000',
            animateStep: 0,
            animateOver: false,
        })
        setTimeout(onceAnimate, 100)

    }

    render() {
        let matrix = this.props.matrix
        let cur = this.props.cur
        if (cur) {
            matrix = MatrixManager.getFinalMatrix(matrix, cur)            
        }
        let blockColorFun = (b: MatrixPoint, y: number) => {
            if (this.state.animateOver) {
               return b == MatrixPoint.X ? '#879372': '#000000'
            } else {
                return this.state.clearLins.indexOf(y) >= 0 ? this.state.animateColor : (b == MatrixPoint.X ? '#879372': '#000000')
            }
        }                
        return (
            <View style={styles.container}>
                {
                    matrix.toArray().map((row, k1) => (<View key={k1} style={styles.row}>
                        {
                            row.toArray().map((b, k2) => (<Block key={k2} color={blockColorFun(b, k1)}/>))                            
                        }
                    </View>))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {        
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 2, 
        alignSelf: 'flex-start'       
    },
    row: {
        flexDirection: 'row',        
    }
});