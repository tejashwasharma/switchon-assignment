const userRepository = require('../repositories/user.repository');
const requestRepository = require('../repositories/request.repository');
const notificationRepository = require('../repositories/notification.repository');

module.exports.login = ({ username, password }) => new Promise(async (resolve, reject) => {
    try {
        let user = await userRepository.getUserByUsername(username, '+password').catch(err => reject(err));
        let isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            let requests = await requestRepository.getRequestByDepartment(user.department).catch(err => reject(err));
            let notifications = await notificationRepository.getNotificationByOwner(user._id).catch(err => reject(err));
            user = user.toObject();
            delete user.password;
            resolve({ user, requests, notifications });
        } else {
            reject(401);
        }
    } catch (err) {
        reject(err);
    }

})