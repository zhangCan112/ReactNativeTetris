import {Dimensions} from 'react-native'
import {List} from 'immutable';

///设备宽高
var {height,width} =  Dimensions.get('window');

///俄罗斯方块形状定义
export enum BlockType {
    I = 'I',
    L = 'L',
    J = 'J',
    Z = 'Z',
    S = 'S',
    O = 'O',
    T = 'T',
}

export enum MatrixPoint {
    X = 0,
    O = 1
}

let O = MatrixPoint.O
let X = MatrixPoint.X

const blockShape = {
    I: [
      [O, O, O, O],
    ],
    L: [
      [X, X, O],
      [O, O, O],
    ],
    J: [
      [O, X, X],
      [O, O, O],
    ],
    Z: [
      [O, O, X],
      [X, O, O],
    ],
    S: [
      [X, O, O],
      [O, O, X],
    ],
    O: [
      [O, O],
      [O, O],
    ],
    T: [
      [X, O, X],
      [O, O, O],
    ],
  };


const fillLine  = [O, O, O, O, O, O, O, O, O, O,];

const blankLine = [X, X, X, X, X, X, X, X, X, X];

const blankMatrix = (()=>{
    let matrix: List<MatrixPoint>[] = []
    for (let i = 0; i < 20; i++) {
        matrix.push(List(blankLine))        
    }
    return List(matrix)
})()


export default {
    screenWidth: width,
    screenHeight: height,
    screenWidthPoint: width / 387.,     
    blockShape,  
    fillLine,
    blankLine,
    blankMatrix
}