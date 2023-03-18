import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";

//combine reducers
const rootReducer = combineReducers({});

//reduxtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

//store
export const store = createStore(rootReducer, enhancer);
