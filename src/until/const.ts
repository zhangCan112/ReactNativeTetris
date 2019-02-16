import { Dimensions } from 'react-native'
import { List } from 'immutable';

///设备宽高
var { height, width } = Dimensions.get('window');





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
    I: ([
        [O, O, O, O],
    ] as MatrixPoint[][]),
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
    O: ([
        [O, O],
        [O, O],
    ] as MatrixPoint[][]),
    T: [
        [X, O, X],
        [O, O, O],
    ],
};

///方块rotate时图形loc的变化
const origin = {
    I: [[-1, 1], [1, -1]],
    L: [[0, 0]],
    J: [[0, 0]],
    Z: [[0, 0]],
    S: [[0, 0]],
    O: [[0, 0]],
    T: [[0, 0], [1, 0], [-1, 1], [0, -1]],
};


const fillLine: Array<MatrixPoint> = [O, O, O, O, O, O, O, O, O, O,];

const blankLine: Array<MatrixPoint>= [X, X, X, X, X, X, X, X, X, X];

const blankMatrix = (() => {
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
    origin,
    fillLine,
    blankLine,
    blankMatrix,    
}