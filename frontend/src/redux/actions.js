import { LOGIN, LOGOUT, POPULATE_DATA, ADD, INIT_REQUESTS, APPROVE, REJECT, ADD_NOTIFICATION } from './constants';

export const addUser = (user) => {
    return (dispatch) => {
        dispatch({ type: LOGIN, data: user });
    }
};

export const removeUser = () => {
    return (dispatch) => {
        return dispatch({ type: LOGOUT });
    }
};

export const addData = (data) => {
    return (dispatch) => {
        return dispatch({ type: POPULATE_DATA, data });
    }
}

export const addRequest = (data) => {
    return (dispatch) => {
        return dispatch({ type: ADD, data });
    }
}

export const setRequests = (data) => {
    return (dispatch) => {
        return dispatch({ type: INIT_REQUESTS, data });
    }
}

export const approveRequest = (id) => {
    return (dispatch) => {
        return dispatch({ type: APPROVE, data: id });
    }
}

export const rejectRequest = (id) => {
    return (dispatch) => {
        return dispatch({ type: REJECT, data: id });
    }
}

export const addNotification = (data) => {
    return (dispatch) => {
        return dispatch({ type: ADD_NOTIFICATION, data });
    }
}