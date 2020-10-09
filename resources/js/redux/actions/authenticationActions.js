import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { saveTokens, removeTokens } from "../../tools/localStorage";
import * as authenticationApi from "../../api/authenticationApi";
import { attatchBearerToken } from "../../tools/axiosClient";

export function userLoginSuccess(tokens) {
    return { type: types.USER_LOGIN_SUCCESS, tokens };
}

export function userLogoutSuccess(tokens) {
    return { type: types.USER_LOGOUT_SUCCESS, tokens };
}

export function login(userLoginDetails) {
    return function(dispatch) {
        dispatch(beginApiCall());
        return authenticationApi
            .Login(userLoginDetails)
            .then(tokens => {
                saveTokens(tokens);
                attatchBearerToken(tokens.access_token);
                dispatch(userLoginSuccess(tokens));
            })
            .catch(err => {
                dispatch(apiCallError(err));
                throw err;
            });
    };
}

export function logout(tokens) {
    return function(dispatch) {
        removeUser();
        dispatch(userLogoutSuccess(tokens));
    };
}
