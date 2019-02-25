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
import TetrisBlock, { TetrisBlockOption } from '../../control/tetrisBlock';
import states from '../../control/states';



interface IProps {
    matrix: List<List<MatrixPoint>>,
    cur?: TetrisBlockOption,
    reset: boolean,
}

interface IState {
    clearLins: number[],
    animateColor: '#560000' | '#000000',
    animateStep: number,
    animateOver: boolean,
    overStep: number,    
}


export default class Matrix extends Component<IProps, IState> {
    
    constructor(props: IProps){
        super(props)
        this.state = {
            clearLins: [],
            animateColor: '#000000',
            animateStep: 0,
            animateOver: true,
            overStep: 0,
        }
    }


    componentWillReceiveProps(nextPros: IProps) {
        let isClear = MatrixManager.isClear(nextPros.matrix)            
        if (isClear !== false && this.state.animateOver && nextPros.reset == false) {
            let clears  = isClear as number[]
            if (clears.length > 0) {                
                this.clearAnimate(clears)   
            }            
        } else if (nextPros.reset == true && this.state.overStep == 0) {
            //开启结束游戏动画
            this.overAnimate()
        }          
    }

    //消除行动画
    clearAnimate = (clears: number[]) => {        
        let onceAnimate = () => { 
            if (this.state.animateStep > 3) {//动画结束
                let lines  = this.state.clearLins
                states.clearLines(lines)                 
                this.setState({
                    ...this.state,
                    clearLins: [],
                    animateStep: 0,
                    animateColor: '#000000',
                    animateOver: true                    
                })                                               
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
    //结束游戏动画
    overAnimate = () => {
        let onceAnimate = () => {
            if (this.state.overStep > 19) {//动画结束  
                states.overEnd()                              
                this.setState({
                    ...this.state,
                    overStep: 0,                    
                })                                               
            } else {
                this.setState({
                    ...this.state,
                    overStep: this.state.overStep + 1
                })
                setTimeout(onceAnimate, 50)
            }  
        }
        setTimeout(onceAnimate, 50)
    }

    render() {
        let matrix = this.props.matrix
        let cur = this.props.cur
        if (cur) {
            matrix = MatrixManager.getFinalMatrix(matrix, new TetrisBlock(cur))            
        }

        if (this.props.reset == true) {
            for (let i = 0; i < this.state.overStep; i++) {
                let row = matrix.size - i - 1                                
                matrix = matrix.update(row, (line)=>{
                    return List(constValue.fillLine)
                })
            }
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