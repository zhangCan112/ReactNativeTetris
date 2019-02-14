import { NEXT_BLOCK, reducerCreator } from '../../until/reducerType';
import MatrixManager from '../../control/matrixManager';


let initState = MatrixManager.getNextType()

const next = reducerCreator(NEXT_BLOCK, initState)
export default next