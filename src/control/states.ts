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
import musicManager from '../until/music';
class States {
  // 自动下落setTimeout变量
  fallInterval?: number = undefined
  

  //初始化
  init  = () => {
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

  //游戏开始
  start = () => {            
       //取消锁定状态和暂停状态和重置状态
       store.dispatch(actions.lock(false))
       store.dispatch(actions.pause(false))
       store.dispatch(actions.reset(false))    
       this.init()
       musicManager.start()
  }


  //自动下落
  auto = () => {
    
   let fall = () => {      
      let state = store.getState() as any as GlobalState
      let pause =  state.get('pause') as StateMapObject['pause'];
      let lock =  state.get('lock') as StateMapObject['lock'];
      if (pause || lock) {//如果暂停或锁定就什么也不错，等下一轮
        let speedRun = (state.get('speed') as StateMapObject['speed']).get('run') || 0
        let timeout = constValue.speeds[speedRun];
        this.fallInterval = setTimeout(fall, timeout)
        return;             
      }
      let cur = state.get('cur') as StateMapObject['cur']
      let next = (new TetrisBlock(cur)).fall()
      let matrix = state.get('matrix') as StateMapObject['matrix']                        
      //当前块如果可以继续向下移动，就继续移动
      if (MatrixManager.want(matrix, next)) {
        store.dispatch(actions.moveBlock(new TetrisBlock(next)))              
        let speedRun = (state.get('speed') as StateMapObject['speed']).get('run') || 0
        let timeout = constValue.speeds[speedRun];
        this.fallInterval = setTimeout(fall, timeout)
      } else {//如果不能下落就计入并更新当前矩阵
        matrix = MatrixManager.getFinalMatrix(matrix, new TetrisBlock(cur))
        store.dispatch(actions.matrix(matrix))
        this.nextAround()
      } 
    }
    if (this.fallInterval) {
      clearTimeout(this.fallInterval)    
    }    

    let state = store.getState() as any as GlobalState
    let speedRun = (state.get('speed') as StateMapObject['speed']).get('run') || 0
    let timeout = constValue.speeds[speedRun];
    this.fallInterval = setTimeout(fall, timeout)    
  }

  //下一轮
  nextAround = () => {
    let state = store.getState() as any as GlobalState

    let matrix = state.get('matrix') as StateMapObject['matrix']
    //    
    if (MatrixManager.isOver(matrix)) {
      this.overStart()
      return
    }

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
  
  //暂停
  pause = (isPause ?: boolean) => {
    let state = store.getState() as any as GlobalState
    let pause = state.get('pause') as StateMapObject['pause']
    let next = (isPause == null) ? !pause : isPause     
    store.dispatch(actions.pause(next))   
    musicManager.move()
  }

  //结束动画开始
  overStart = () => {
    this.pause(true)
    store.dispatch(actions.reset(true))
    musicManager.gameOver()
  }

  //结束动画结束
  overEnd = () => {           
    store.dispatch(actions.pause(false))
    store.dispatch(actions.reset(false))
    store.dispatch(actions.matrix(constValue.blankMatrix))        
    store.dispatch(actions.lock(true))
    store.dispatch(actions.points(0))
    store.dispatch(actions.clearLines(0))       
  }

  
}

let  states = new States()

export default states