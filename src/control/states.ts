import { MATRIX } from './../until/reducerType';
/**
 *  游戏各种状态的逻辑处理类
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import store from '../store';
import { GlobalState, StateMapObject } from '../reducers';
import MatrixManager from './matrixManager';
import actions from '../actions';
import TetrisBlock from './tetrisBlock';
import constValue from '../until/const';

class States {
  // 自动下落setTimeout变量
  fallInterval?: number = undefined
  
  //游戏开始
  start = () => {      
      let state = store.getState() as any as GlobalState
      
      //生成初始矩阵
      let startLines =  state.get('startLines') as StateMapObject['startLines']      
      let startMatrix = MatrixManager.getStartMatrix(startLines);
      store.dispatch(actions.matrix(startMatrix)) 

      //出现一个降落块
      let next = state.get('next') as StateMapObject['next']
      store.dispatch(actions.moveBlock(new TetrisBlock({type: next})))
      //生成下一个要出现的块
      store.dispatch(actions.nextBlock())
      //自动下落
      states.auto()                 
  }


  //自动下落
  auto = (timeout = 300) => {
   let fall = () => {
      let state = store.getState() as any as GlobalState
      let cur = state.get('cur') as StateMapObject['cur']
      let next = cur.fall()
      let matrix = state.get('matrix') as StateMapObject['matrix']
      //当前块如果可以继续向下移动，就继续移动
      if (MatrixManager.want(matrix, next)) {
        store.dispatch(actions.moveBlock(new TetrisBlock(next)))      
        this.fallInterval = setTimeout(fall, timeout)
      } else {//如果不能下落就计入并更新当前矩阵
        matrix = MatrixManager.getFinalMatrix(matrix, cur)
        store.dispatch(actions.matrix(matrix))
        this.nextAround()
      } 
    }
    if (this.fallInterval) {
      clearTimeout(this.fallInterval)    
    }    
    
    this.fallInterval = setTimeout(fall, timeout)    
  }

  //下一轮
  nextAround = () => {
    let state = store.getState() as any as GlobalState
    //出现一个降落块
    let next = state.get('next') as StateMapObject['next']
    store.dispatch(actions.moveBlock(new TetrisBlock({type: next})))
    //生成下一个要出现的块
    store.dispatch(actions.nextBlock(MatrixManager.getNextType()))
    //自动下落
    states.auto()                 
  }

  //消除行
  clearLines = (lines: number[]) => {
    let state = store.getState() as any as GlobalState 
    //计算和更新当前分数 和 最高分数
    let curPoints = state.get('points') as StateMapObject['points']
    let maxPoints = state.get('max') as StateMapObject['max']
    let addPoints = constValue.clearPoints[lines.length - 1]
    let points = curPoints + addPoints
    store.dispatch(actions.points(points))
    if (points >  maxPoints) {
      store.dispatch(actions.max(points))
    }
    
    //更新矩阵         
    let matrix = state.get('matrix') as StateMapObject['matrix']
    let nextMatrix =  MatrixManager.clearLines(matrix, lines)
    store.dispatch(actions.matrix(nextMatrix))        
  }

  
}

let  states = new States()

export default states