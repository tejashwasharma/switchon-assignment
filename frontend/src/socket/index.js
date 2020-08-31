import io from "socket.io-client";
import { store } from '../redux/store';
import { addRequest, approveRequest, rejectRequest, addNotification } from "../redux/actions";

const socket = io('http://13.126.151.69:8000');

export const join = (user) => socket.emit('join', user);

export const raiseRequest = (request) => socket.emit('request', request);

export const updateRequest = (request) => socket.emit('updateRequest', request);

export const updateNotification = (userId) => socket.emit('updateNotification', userId);

export const heartbeat = () => setInterval(() => socket.emit('heartbeat', true), 5000);

socket.on('heartbeat', data => {
    console.log('heartbeat: ', data);
});

socket.on('getRequest', request => {
    updateNotification(request.user)
    store.dispatch(addRequest(request))
});

socket.on('updateRequest', request => {
    updateNotification(request.user)
    if (request.isApproved) store.dispatch(approveRequest(request._id))
    else store.dispatch(rejectRequest(request._id))
});

socket.on("notification", notification => {
    store.dispatch(addNotification(notification))
});