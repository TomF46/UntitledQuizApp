import initialState from "../redux/reducers/initialState";

export const loadState = () => {
    const user = localStorage.getItem("user");
    let userState = user == null ? null : JSON.parse(user);
    let state = initialState;
    state.user = userState;
    return state;
};

export const saveUser = user => {
    try {
        const serializedState = JSON.stringify(user);
        localStorage.setItem("user", serializedState);
    } catch {
        // ignore write errors
    }
};

export const removeUser = () => {
    try {
        localStorage.removeItem("user");
    } catch {
        //
    }
};
