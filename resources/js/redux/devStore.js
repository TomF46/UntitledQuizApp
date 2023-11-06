import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { loadState } from '../tools/localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let stateWithUser = loadState();
export default createStore(
  rootReducer,
  stateWithUser,
  composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())),
);
