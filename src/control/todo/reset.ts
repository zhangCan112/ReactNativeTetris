import states from '../states';
import { StateMapObject } from './../../reducers/index';
import store from '../../store';
import { GlobalState } from '../../reducers';

//重新开始
let reset = () => {
    let state = store.getState() as any as GlobalState
    let lock = state.get('lock') as StateMapObject['lock']
    if (lock == true) {
        states.start()
    } else {
        states.overStart()
    }    
}

export default reset