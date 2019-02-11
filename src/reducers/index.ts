import { combineReducers } from 'redux-immutable';


const pause = (state = {}, action) => {
    return state;
  };
  

const rootReducer = combineReducers({pause,});

export default rootReducer;
