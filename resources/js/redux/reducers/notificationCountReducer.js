import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function UserReducer(state = initialState.notificationCount, action) {
    switch (action.type) {
        case types.LOAD_NOTIFICATION_COUNT_SUCCESS:
            return action.notificationCount;
        case types.NOTIFICATION_COUNT_DECREMENT:
            return state - 1;
        default:
            return state;
    }
}
