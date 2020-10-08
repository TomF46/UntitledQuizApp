import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function AuthenticationReducer(
    state = initialState.user,
    action
) {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            return action.user;
        case types.USER_LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }
}
