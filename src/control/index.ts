
import store from '../store';
import { GlobalState, StateMapObject } from './../reducers/index';

import left from './todo/left';
import right from './todo/right';
import down from './todo/down';
import rotate from './todo/rotate';
import pause from './todo/pause';
import reset from './todo/reset';
import space from './todo/space';
import music from './todo/music';
import actions from '../actions';

import constValue from '../until/const';
import MusicManager from '../until/music';


let caseWithoutPause = (operation : (...args: any)=>any) => (...args: any)  =>  {
    let state = store.getState() as any as GlobalState    
    let pause = state.get('pause') as StateMapObject['pause']
    if (pause == true) {
        let  empty = ()=>{}
        return empty()
    } else {
        return operation(...args)
    }
}

let updateStartLines = (step: 1 | -1) => () => {
    let state = store.getState() as any as GlobalState 
    let startLines = state.get('startLines') as StateMapObject['startLines']
    let next =  (startLines + step ) % constValue.maxStartLines
    store.dispatch(actions.startLines(next))
    MusicManager.move()
}

let updateSpeedStart = (step: 1 | -1) => () => {
    let state = store.getState() as any as GlobalState 
    let speed = state.get('speed') as StateMapObject['speed']
    let speedStart = speed.get('start') || 0
    let next =  (speedStart + step ) % constValue.speeds.length    
    store.dispatch(actions.speedStart(next))
    store.dispatch(actions.speedRun(next))
    MusicManager.move()
}

let swicthOperationWithLock = (lockOp: (...args: any)=>any, unlockOp: (...args: any)=>any) => (...args: any) => {
    let state = store.getState() as any as GlobalState    
    let lock = state.get('lock') as StateMapObject['lock']
    if (lock == true) {
       return lockOp(...args)
    } else {
        return unlockOp(...args)
    }
}


let control = {
    pause,
    reset,
    left: swicthOperationWithLock(updateSpeedStart(-1),caseWithoutPause(left)),
    right: swicthOperationWithLock(updateSpeedStart(+1),caseWithoutPause(right)),
    rotate: swicthOperationWithLock(updateStartLines(+1),caseWithoutPause(rotate)),
    down: swicthOperationWithLock(updateStartLines(-1),caseWithoutPause(down)),    
    space: swicthOperationWithLock(()=>{},caseWithoutPause(space)),
    music,
}

export default control