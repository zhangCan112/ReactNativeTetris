/**
 *  matrix管理类
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { List } from 'immutable';
import { MatrixPoint } from './../until/const';
import constValue from './../until/const';
import TetrisBlock from './tetrisBlock';
import { TetrisBlockOption } from './tetrisBlock';
import { BlockType } from './../until/const';

class MatrixManager {

    ///生成初始matrix 
    getStartMatrix = (startLines: number) => {
        let startMatrix: List<List<MatrixPoint>> = List([])
        for (let i = 0; i < 20; i++) {
            if (i < startLines) {
                if (i <= 2) { // 0-3
                    startMatrix = startMatrix.push(this.getLine(5, 8));
                } else if (i <= 6) { // 4-6
                    startMatrix = startMatrix.push(this.getLine(4, 9));
                } else { // 7-9
                    startMatrix = startMatrix.push(this.getLine(3, 9));
                }
            } else {
                startMatrix = startMatrix.unshift(List(constValue.blankLine))
            }
        }
        return startMatrix
    }

    ///随机获取下一个方块类型
    getNextType = () => {
        let blockTyps = [BlockType.I, BlockType.J, BlockType.L, BlockType.O, BlockType.S, BlockType.T, BlockType.Z]
        let len = blockTyps.length;
        return blockTyps[(Math.floor(Math.random() * 10)) % len]
    }

    ///获取当前矩阵+当前下落方块形成的最终矩阵
    getFinalMatrix = (matrix: List<List<MatrixPoint>>, cur: TetrisBlock) => {
        let loc = cur.loc
        let shape = cur.shape
        shape.reverse().forEach((row, x) => row.forEach((p, y) => {                        
            if (p && (loc.y + y) >= 0) {
                let line = matrix.get(loc.y + y)
                if (line) {
                    line = line.set(loc.x + x, MatrixPoint.O)
                    matrix = matrix.set(loc.y + y, line)
                }
            }
        }))
        return matrix
    }

    ///方块是否能移到到指定位置
    want = (matrix: List<List<MatrixPoint>>, next: TetrisBlockOption) => {
        let loc = next.loc!
        let shape = next.shape!
        let want = true
        shape.reverse().forEach((row, x) => row.forEach((p, y) => {
            if (loc.x < 0) {//左边
                want = false
                return false
            }
            if (loc.x + shape.size > constValue.fillLine.length) {//右边
                want = false
                return false;
            }

            if (loc.y + y >= matrix.size) {//底部
                want = false
                return false
            }
            //这个点p的所在坐标
            let px = loc.x + x
            let py = loc.y + y
            if (p == MatrixPoint.O) { //和matrix上的亮点撞了，则不能移动
                if (matrix.get(py)!.get(px)! == MatrixPoint.O) {
                    want = false
                    return false
                }

                return true
            }

            return true
        }))
        return want
    }

    ///是否达到消除状态
    isClear = (matrix: List<List<MatrixPoint>>) => { 
        let clearLines: number[] = []
        matrix.forEach((row, index) => {
            if (row.every(p => !!p)) {
                clearLines.push(index)                
            }
        })

        if (clearLines.length == 0) {
            return false
        }

        return clearLines
    }

    /**
     * 私有方法
     */

    ///用来获取随机生成的一行块    
    private getLine = (min: number, max: number) => {
        let line: MatrixPoint[] = []
        let count = Math.min(((Math.round(Math.random() * 10) % (max - min)) + 1 + min), 10)

        //插入高亮
        for (let i = 0; i < count; i++) {
            line.push(MatrixPoint.O)
        }
        //随机插入空白区域
        for (let j = 0; j < 10 - count; j++) {
            let index = Math.min((Math.floor(Math.random() * 10)), 9)
            line.splice(index, 0, MatrixPoint.X)
        }
        return List(line)
    }
}


let manager = new MatrixManager()

export default  manager