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
import { MatrixPoint, BlockType } from '../../until/const';
import constValue from '../../until/const';
import Block from '../block';
import Point from '../../until/point';

interface Iprops {
    shapeType?: BlockType
}

let O = MatrixPoint.O
let X = MatrixPoint.X

let empty: MatrixPoint[][] = [
    [X, X, X, X], 
    [X, X, X, X]
]

let shapeOriginMap = {
    I: new Point(0,0),
    L: new Point(0,0),
    J: new Point(0,0),
    Z: new Point(0,0),
    S: new Point(0,0),
    O: new Point(1,0),
    T: new Point(0,0),
}

export default class Next extends Component<Iprops> {
        
    render() {                 
        let matrix = this.getFinalMatrix()
        return (
            <View style={styles.container}>
                {
                    matrix.map((row, k1) => (<View key={k1} style={styles.row}>
                        {
                            row.map((b, k2) => (<Block key={k2} color={b == MatrixPoint.X ? '#879372': '#000000'}/>))                            
                        }
                    </View>))
                }
            </View>
        );
    }    
    
    getFinalMatrix = () => {
        let matrix = [...empty]                                  
        if (this.props.shapeType) {           
           let blockShape = constValue.blockShape[this.props.shapeType]
           let shapeOrigin = shapeOriginMap[this.props.shapeType]
           matrix = matrix.map((row, y)=> row.map((p, x)=>{
               let mapX = x - shapeOrigin.x
               let mapY = y - shapeOrigin.y
               if (mapX < 0 || mapY < 0) {
                return p                   
               } 
               if (!blockShape[mapY]) {
                   return p
               }  
               
               if (!blockShape[mapY][mapX]) {
                   return p
               }
               
               return blockShape[mapY][mapX]
           }))
        }        

        return matrix
    }
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },    
    row: {
        flexDirection: 'row',        
    }
})