const { Notification } = require('../models');

module.exports.createNotification = (notify) => new Promise((resolve, reject) => {
    Notification.create(notify)
        .then((notify) => {
            resolve(notify);
        })
        .catch((err) => {
            reject(err);
        })
})


module.exports.updateNotification = (owner) => new Promise((resolve, reject) => {
    Notification.findOneAndUpdate({ owner }, { $set: { isRead: true } }, { new: true })
        .then((request) => {
            resolve(request);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getNotificationByOwner = (owner) => new Promise((resolve, reject) => {
    Notification.find({ owner })
        .then((notify) => {
            resolve(notify);
        })
        .catch((err) => {
            reject(err);
        })
})