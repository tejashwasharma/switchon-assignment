const notificationRepository = require('../repositories/notification.repository');

module.exports.updateNotification = async (owner) => {
    try {
        await notificationRepository.updateNotification(owner).catch(err => { throw err; });
    } catch (err) {
        throw err;
    }
}