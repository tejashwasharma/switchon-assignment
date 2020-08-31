const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;

module.exports = {
    Department: require('./department.model'),
    User: require('./user.model'),
    Request: require('./request.model'),
    Notification: require('./notification.model'),
};