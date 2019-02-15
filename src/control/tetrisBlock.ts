/**
 *  下落方块的定义类
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import { List, fromJS } from 'immutable';
import { BlockType, MatrixPoint } from '../until/const';
import constValue from '../until/const';
import Point from '../until/point'

let rotateOrigin = constValue.origin
let blockShape = constValue.blockShape


export interface TetrisBlockOption {
    type: BlockType,
    shape?: List<List<MatrixPoint>>,
    loc?: Point,
    rotateIndex?: number,
    timeStamp?: number
}

export default class TetrisBlock {

    type: BlockType = BlockType.I;
    shape: List<List<MatrixPoint>> = List([]);
    loc: Point = new Point(0, 0);
    rotateIndex: number = 0;
    timeStamp?: number = undefined;

    constructor(option: TetrisBlockOption) {
        this.type = option.type

        if (option.rotateIndex) {
            this.rotateIndex = option.rotateIndex!           
        }
       

        this.timeStamp = option.timeStamp ||  Date.now()
        
        if(option.shape) {
            this.shape = option.shape!
        } else {            
            this.shape = List(blockShape[this.type].map(m => List(m)))
        }
        
        if (option.loc) {
            this.loc = option.loc!
        } else {
            let originLocs = {
                I : new Point(3, 0),
                L : new Point(4, -1),
                J : new Point(4, -1),
                Z : new Point(4, -1),
                S : new Point(4, -1),
                O : new Point(4, -1),
                T : new Point(4, -1),
            }
            this.loc = originLocs[this.type]
        }        
    }

    /**
     * 公共方法
     */
    ///旋转
    rotate = (): TetrisBlockOption => {
        let shape = this.shape;

        //shape向左旋转之后的新shape
        let nextShape = List<List<MatrixPoint>>([])
        shape.toArray().forEach(m => m.toArray().forEach((n, k) => {
            let index = m.size - k - 1
            if (nextShape.get(index) === undefined) {
                nextShape = nextShape.set(index, List<MatrixPoint>([]))
            }
            let tempK = nextShape.get(index)!.push(n)
            nextShape = nextShape.set(index, tempK)
        }))

        //新的坐标起点
        let nextX = this.loc.x + rotateOrigin[this.type][this.rotateIndex][0]
        //靠近左边边距，则移动到0
        nextX = Math.max(0, nextX)
        //靠近右边边距，则移动到 边距 - x
        nextX = Math.min(constValue.blankLine.length - nextShape.size, nextX)
        let nextLoc: Point = new Point(nextX,
                                       this.loc.y + rotateOrigin[this.type][this.rotateIndex][1])

        //新的旋转位置
        let nextRotateIndex: number = (parseInt(`${this.rotateIndex}`) + 1) % rotateOrigin[this.type].length
        return {
            type: this.type,
            shape: nextShape,
            loc: nextLoc,
            rotateIndex: nextRotateIndex,
            timeStamp: this.timeStamp
        }
    }

    ///下落
    fall = (step: number = 1): TetrisBlockOption => {
        return {
            type: this.type,
            shape: this.shape,
            loc: new Point(this.loc.x, this.loc.y + step),
            rotateIndex: this.rotateIndex,
            timeStamp: Date.now()
        }
    }

    ///向左
    left = (): TetrisBlockOption => {
        return {
            type: this.type,
            shape: this.shape,
            loc: new Point(this.loc.x - 1, this.loc.y),
            rotateIndex: this.rotateIndex,
            timeStamp: this.timeStamp
        }
    }

    ///向右
    right = (): TetrisBlockOption => {
        return {
            type: this.type,
            shape: this.shape,
            loc: new Point(this.loc.x + 1, this.loc.y),
            rotateIndex: this.rotateIndex,
            timeStamp: this.timeStamp
        }
    }


    /**
     * 私有方法
     */

}

