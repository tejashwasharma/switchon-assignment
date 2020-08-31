import { combineReducers } from 'redux';
import { LOGIN, LOGOUT, POPULATE_DATA, APPROVE, REJECT, ADD, INIT_REQUESTS, ADD_NOTIFICATION } from './constants';

const initialState = {
    user: null,
    departments: [],
    users: []
}

const initialRequests = {
    requests: []
}

const initialNotifications = {
    notification: []
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.data }
        case LOGOUT:
            return { ...state, user: null };
        case POPULATE_DATA:
            return { ...state, users: action.data.user, departments: action.data.department }
        default:
            return state;
    }
}

const requestReducers = (state = initialRequests, action) => {
    switch (action.type) {
        case INIT_REQUESTS:
            return { ...state, requests: action.data }
        case ADD:
            return { ...state, requests: [...state.requests, action.data] }
        case APPROVE:
            let approvedRequests = state.requests.filter((req) => {
                if (req._id === action.data.id) { req.isApproved = true; return req; }
                else return req;
            })
            return { ...state, requests: approvedRequests }
        case REJECT:
            let rejectedRequests = state.requests.filter((req) => {
                if (req._id === action.data.id) { req.isRejected = true; return req; }
                else return req;
            })
            return { ...state, requests: rejectedRequests }
        default:
            return state;
    }
}

const notificationReducers = (state = initialNotifications, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return { ...state, notification: [...state.notification, action.data] }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    userDetails: reducers,
    requestDetails: requestReducers,
    notificationDetails: notificationReducers
})

export default rootReducer;