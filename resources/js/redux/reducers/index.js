import { combineReducers } from "redux";
import tokens from "./authenticationReducer";
import apiCallsInProgress from "./apiStatusReducer";
import isAdmin from "./isAdminReducer";
import user from "./userReducer";
import notificationCount from "./notificationCountReducer"

const rootReducer = combineReducers({
    tokens,
    user,
    apiCallsInProgress,
    isAdmin,
    notificationCount
});

export default rootReducer;
