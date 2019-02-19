

import {AsyncStorage} from 'react-native';
import store from '../store';
import { GlobalState } from '../reducers';
import { Map } from 'immutable';
import {  reducersMapObject } from '../reducers';
import { combineReducers } from 'redux-immutable';

type Store = typeof store
let StorageKey = 'ReactNativeTetris'
export let subscribeRecord = (store: Store) => { // 将状态记录到 localStorage
    store.subscribe(() => {
      let data = store.getState() as any as GlobalState;            
      if (data.get('lock')) { // 当状态为锁定, 不记录
        return;
      }
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
  let data = Map(jsdata) as GlobalState  
  store.replaceReducer(combineReducers(reducersMapObject, () => data as any))
}