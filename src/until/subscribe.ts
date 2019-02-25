

import {AsyncStorage} from 'react-native';
import store from '../store';
import { GlobalState, StateMapObject } from '../reducers';
import { Map, fromJS } from 'immutable';
import {  reducersMapObject } from '../reducers';
import { combineReducers } from 'redux-immutable';
import actions from '../actions';
import states from '../control/states';

type Store = typeof store
let StorageKey = 'ReactNativeTetris'
export let subscribeRecord = (store: Store) => { // 将状态记录到 localStorage
    store.subscribe(() => {
      let data = store.getState() as any as GlobalState;                  
      let jsdata = data.toJS()
      let dataStr = JSON.stringify(jsdata);
      dataStr = encodeURIComponent(dataStr);      
      AsyncStorage.setItem(StorageKey, dataStr);
    });
  }

  export let lastRecord = async () => {
  let dataStr =  await AsyncStorage.getItem(StorageKey)
  if (!dataStr) {
    return    
  }
  dataStr = decodeURIComponent(dataStr)
  let jsdata = JSON.parse(dataStr)

  store.dispatch(actions.lock(jsdata.lock)) 
  store.dispatch(actions.pause(jsdata.pause))  
  store.dispatch(actions.reset(jsdata.reset))
  store.dispatch(actions.clearLines(jsdata.clearLines))  
  store.dispatch(actions.matrix(fromJS(jsdata.matrix)))
  store.dispatch(actions.max(jsdata.max))
  store.dispatch(actions.moveBlock({...jsdata.cur, shape: fromJS(jsdata.cur.shape)}))
  store.dispatch(actions.nextBlock(jsdata.next))  
  store.dispatch(actions.points(jsdata.points))  
  store.dispatch(actions.speedRun(jsdata.speed.run))
  store.dispatch(actions.speedStart(jsdata.speed.start))
  store.dispatch(actions.startLines(jsdata.startLines))
}