import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCurrentUserProfileSuccess(user) {
    return { type: types.LOAD_USER_PROFILE_SUCCESS, user };
}

export function loadCurrentUserProfile() {
    return function(dispatch) {
        dispatch(beginApiCall());
        return userApi
            .getCurrentUser()
            .then(user => {
                dispatch(loadCurrentUserProfileSuccess(user));
            })
            .catch(err => {
                dispatch(apiCallError(err));
                throw err;
            });
    };
}
