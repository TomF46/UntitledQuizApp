import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadState } from '../tools/localStorage';
import rootReducer from './reducers';

let stateWithUser = loadState();
export default createStore(rootReducer, stateWithUser, applyMiddleware(thunk));
