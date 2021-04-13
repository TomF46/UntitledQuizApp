import { combineReducers } from "redux";
import tokens from "./authenticationReducer";
import apiCallsInProgress from "./apiStatusReducer";
import isAdmin from "./isAdminReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
    tokens,
    user,
    apiCallsInProgress,
    isAdmin
});

export default rootReducer;
