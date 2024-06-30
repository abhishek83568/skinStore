// store.js
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk';
import { productReducer } from './reducer';
 // adjust the import according to your file structure

const rootReducer = combineReducers({
  product: productReducer,
  
 
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
