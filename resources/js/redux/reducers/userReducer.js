import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function UserReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.LOAD_USER_PROFILE_SUCCESS:
            return action.user;
        default:
            return state;
    }
}
