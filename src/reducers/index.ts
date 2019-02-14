import { combineReducers } from 'redux-immutable';
import clearLines from './clearLines';
import cur from './cur';
import matrix from './matrix';
import max from './max';
import next from './next';
import pause from './pause';
import points from './points';
import startLines from './startLines';
const rootReducer = combineReducers({
  clearLines,
  startLines,
  matrix,
  cur,
  next,
  max,
  points,
  pause,
});

export default rootReducer;
