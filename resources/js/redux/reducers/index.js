import { combineReducers } from "redux";
import user from "./authenticationReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
    user,
    apiCallsInProgress
});

export default rootReducer;
