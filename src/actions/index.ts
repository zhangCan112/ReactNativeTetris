import { NEXT_BLOCK, MOVE_BLOCK, START_LINES, MATRIX, CLEAR_LINES, POINTS, MAX, PAUSE } from './../until/reducerType';
import { BlockType } from './../until/const';
import { actionCreator } from "../until/action";
import TetrisBlock from "../control/tetrisBlock";


export default {
    nextBlock: actionCreator<BlockType>(NEXT_BLOCK),
    moveBlock: actionCreator<TetrisBlock>(MOVE_BLOCK),
    startLines: actionCreator(START_LINES, 0),
    matrix: actionCreator<TetrisBlock>(MATRIX),
    clearLines: actionCreator(CLEAR_LINES, 0),
    points: actionCreator(POINTS, 0),
    max: actionCreator(MAX, 0),
    pause: actionCreator(PAUSE, false),
};