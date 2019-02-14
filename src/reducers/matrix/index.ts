import constValue from '../../until/const';
import { MATRIX, reducerCreator } from '../../until/reducerType';


let initState = constValue.blankMatrix

const matrix = reducerCreator(MATRIX, initState)

export default matrix