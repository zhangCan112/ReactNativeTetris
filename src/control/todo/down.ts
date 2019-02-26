import { StateMapObject } from './../../reducers/index';

import store from '../../store';
import actions from '../../actions';
import { GlobalState } from '../../reducers';
import MatrixManager from '../matrixManager';
import TetrisBlock from '../tetrisBlock';
import musicManager from '../../until/music';

let down = () => {
    let state = store.getState() as any as GlobalState
    let matrix = state.get('matrix') as StateMapObject['matrix']
    let cur = state.get('cur') as StateMapObject['cur']    
    let next =  (new TetrisBlock(cur)).fall()
    if (MatrixManager.want(matrix, next)) {
        store.dispatch(actions.moveBlock(next))                
    }
    musicManager.move()
}

export default down;