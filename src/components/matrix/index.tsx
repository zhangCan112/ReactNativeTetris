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
import Block from '../block';


import constValue, { MatrixPoint, BlockType } from '../../until/const'
import MatrixManager from '../../control/matrixManager';
import TetrisBlock from '../../control/tetrisBlock';
import Point from '../../until/point';

export default class Matrix extends Component {
    render() {
        let matrix = constValue.blankMatrix
        matrix = MatrixManager.getStartMatrix(3) 
        let a =  new TetrisBlock({type: BlockType.I, loc: new Point(4, 0)})
        let next =  new TetrisBlock(a.rotate())
        matrix = MatrixManager.getFinalMatrix(matrix, next)         
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