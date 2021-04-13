import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as authenticationApi from "../../api/authenticationApi";

export function checkUserIsAdminSuccess(isAdmin) {
    return { type: types.CHECK_USER_IS_ADMIN_SUCCESS, isAdmin };
}


export function checkUserIsAdmin() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return authenticationApi.getUserIsAdmin().then(data => {
            dispatch(checkUserIsAdminSuccess(data.isAdmin));
        }).catch(err => {
            dispatch(apiCallError(err));
            dispatch(checkUserIsAdminSuccess(false));
            throw err;
        });
    }
}
