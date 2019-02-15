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
  auto = (timeout = 100) => {
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

  
}

let  states = new States()

export default states