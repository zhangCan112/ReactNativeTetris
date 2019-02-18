
import states from '../states';
import { StateMapObject } from './../../reducers/index';
import store from '../../store';
import { GlobalState } from '../../reducers';

//暂停
let pause = () => {
    let state = store.getState() as any as GlobalState
    let lock = state.get('lock') as StateMapObject['lock']
    if (lock == false) {
        states.pause()        
    }    
}

export default pause