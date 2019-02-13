import { List } from 'immutable';
import { MatrixPoint } from '../../until/const';
import constValue from '../../until/const';
import { Action } from "../../until/action";
import { MATRIX } from '../../until/reducerType';


let initState = constValue.blankMatrix

const matrix = (state: List<List<MatrixPoint>> = initState, action: Action<List<List<MatrixPoint>>>) => {
    switch(action.type) {
        case MATRIX:
        return action.data
        default:
        return state
    }
}