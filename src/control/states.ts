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
  fallInterval = null
  
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
  auto = () => {

  }
  
}

let  states = new States()

export default states