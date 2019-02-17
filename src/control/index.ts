
import store from '../store';
import { GlobalState, StateMapObject } from './../reducers/index';

import left from './todo/left';
import right from './todo/right';
import rotate from './todo/rotate';
import pause from './todo/pause';
import reset from './todo/reset';


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

let control = {
    pause,
    reset,
    left: caseWithoutPause(left),
    right: caseWithoutPause(right),
    rotate: caseWithoutPause(rotate),    
}

export default control