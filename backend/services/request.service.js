const requestRepository = require('../repositories/request.repository');
const notificationRepository = require('../repositories/notification.repository');

module.exports.createRequest = async (io, request) => {
    try {
        request = await requestRepository.createRequest(request).catch((err) => { throw err });
        io.to(String(request.department)).to(String(request.owner)).emit("getRequest", request);
        let notification = {
            notification: 'New request Arrival.',
            owner: request.user,
            department: request.department,
            isRead: false
        }
        notification = await notificationRepository.createNotification(notification).catch(err => { throw err });
        io.emit("notification", notification);
    } catch (err) {
        throw err;
    }
}

module.exports.updateRequest = async (io, request) => {
    try {
        let requestId = request._id;
        delete request._id;
        request = await requestRepository.updateRequest(requestId, request).catch((err) => { throw err });
        io.to(String(request.department)).to(String(request.owner)).emit("updateRequest", request);
        let notification = {
            notification: request.isApproved ? 'Request Approved.' : 'Request Rejected.',
            owner: request.owner,
            department: request.department,
            isRead: false
        }
        notification = await notificationRepository.createNotification(notification).catch(err => { throw err });
        io.emit("notification", notification);
    } catch (err) {
        throw err;
    }
}