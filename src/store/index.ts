import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(rootReducer, global.devToolsExtension && global.devToolsExtension());

export default store;