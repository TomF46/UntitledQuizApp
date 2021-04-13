import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function IsAdminReducer(
    state = initialState.isAdmin,
    action
) {
    switch (action.type) {
        case types.CHECK_USER_IS_ADMIN_SUCCESS:
            return action.isAdmin;
        default:
            return state;
    }
}
