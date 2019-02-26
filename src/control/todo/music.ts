
import states from '../states';
import { StateMapObject } from './../../reducers/index';
import store from '../../store';
import { GlobalState } from '../../reducers';
import musicManager from '../../until/music';
import actions from '../../actions';

//音效
let music = () => {
    let state = store.getState() as any as GlobalState
    let music = state.get('music') as StateMapObject['music']
    music = !music;
    store.dispatch(actions.music(music))
    if (music == false) {
        musicManager.off()
    } else {
        musicManager.move()
    }   
}

export default music