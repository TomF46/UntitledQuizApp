import * as types from "./actionTypes";
// import * as authenticationApi from "../../api/authenticationApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { saveUser, removeUser } from "../../tools/localStorage";

export function userLoginSuccess(user) {
  return { type: types.USER_LOGIN_SUCCESS, user };
}

export function userLogoutSuccess(user) {
  return { type: types.USER_LOGOUT_SUCCESS, user };
}

export function login(userLoginDetails) {
  return function (dispatch) {
    dispatch(beginApiCall());
//     return authenticationApi
//       .Login(userLoginDetails)
//       .then((user) => {
//         saveUser(user);
//         dispatch(userLoginSuccess(user));
//       })
//       .catch((err) => {
//         dispatch(apiCallError(err));
//         throw err;
//       });
//   };
}

export function logout(user) {
  return function (dispatch) {
    removeUser();
    dispatch(userLogoutSuccess(user));
  };
}
