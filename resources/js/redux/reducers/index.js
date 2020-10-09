import { combineReducers } from "redux";
import tokens from "./authenticationReducer";
import apiCallsInProgress from "./apiStatusReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
    tokens,
    user,
    apiCallsInProgress
});

export default rootReducer;
