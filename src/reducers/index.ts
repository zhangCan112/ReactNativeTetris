import { combineReducers } from 'redux-immutable';
import clearLines from './clearLines';
import cur from './cur';
import matrix from './matrix';
import max from './max';
import next from './next';
import pause from './pause';
import points from './points';
import startLines from './startLines';
import speed from './speed';
import reset from './reset'
import lock from './lock'
import { Map } from 'immutable';
import { ReducersMapObject } from 'redux';
import { Reducer } from 'react';


let reducersMapObject = {
  clearLines,
  startLines,
  matrix,
  cur,
  next,
  max,
  points,
  pause,
  speed,
  reset,
  lock,
}

const rootReducer = combineReducers(reducersMapObject);

export default rootReducer;


/**
 * Mapped Types 实现State类型化 #参考：https://yq.aliyun.com/articles/613862
 */

function returnType<FullState>(reducersMap: Reducer<FullState, any>): FullState {
  return {} as FullState;
}

const mockStateMapObject = returnType(rootReducer);

export type StateMapObject = typeof mockStateMapObject;
export type GlobalState = Map<keyof (StateMapObject), StateMapObject[keyof (StateMapObject)]>