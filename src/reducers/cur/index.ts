import { MOVE_BLOCK, reducerCreator } from '../../until/reducerType';
import TetrisBlock from '../../control/tetrisBlock';
import MatrixManager from '../../control/matrixManager';


let initState = (new TetrisBlock({type: MatrixManager.getNextType()})).fall(0)

const cur = reducerCreator(MOVE_BLOCK, initState)
export default cur