import { SPEED_START, SPEED_RUN } from '../../until/reducerType';
import {Action} from '../../until/action';
import { Map } from 'immutable';


let jsInitState = {    
    start: 1,
    run: 1,
}

let initState = Map<keyof typeof jsInitState,number>(jsInitState as any)

const speed = (state = initState, action: Action<number>) => {
    switch (action.type) {
        case SPEED_START:
            state = state.set('start', action.data)
            break;
        case SPEED_RUN:
            state = state.set('run', action.data)
            break;    
        default:
            break;
    }
    return state    
}
export default speed