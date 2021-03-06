import { StateMapObject } from './../../reducers/index';

import store from '../../store';
import actions from '../../actions';
import { GlobalState } from '../../reducers';
import MatrixManager from '../matrixManager';
import TetrisBlock from '../tetrisBlock';
import musicManager from '../../until/music';
let space = () => {
    let state = store.getState() as any as GlobalState
    let matrix = state.get('matrix') as StateMapObject['matrix']
    let cur = state.get('cur') as StateMapObject['cur']    

    
    for (let step = 0; step < matrix.size; step++) {
        let next = (new TetrisBlock(cur)).fall(step)
        if (!MatrixManager.want(matrix, next)) {
            next = (new TetrisBlock(cur)).fall(step - 1)  
            store.dispatch(actions.moveBlock(next))            
            break;
        }
    }    
    musicManager.drop()        
}

export default space;