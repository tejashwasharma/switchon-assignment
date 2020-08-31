const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  isRead: {
    type: Boolean
  },
  type: {
    type: String,
    default: 'notification'
  }
}, { timestamps: true, collection: 'notification' });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;