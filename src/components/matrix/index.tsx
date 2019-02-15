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



interface IProps {
    matrix: List<List<MatrixPoint>>,
    cur?: TetrisBlock
}


export default class Matrix extends Component<IProps> {
    render() {
        let matrix = this.props.matrix
        let cur = this.props.cur
        if (cur) {
            matrix = MatrixManager.getFinalMatrix(matrix, cur)            
        }                
        return (
            <View style={styles.container}>
                {
                    matrix.toArray().map((row, k1) => (<View key={k1} style={styles.row}>
                        {
                            row.toArray().map((b, k2) => (<Block key={k2} color={b == MatrixPoint.X ? '#879372': '#000000'}/>))
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