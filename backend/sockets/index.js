const { createRequest, updateRequest } = require('../services/request.service');
const { updateNotification } = require('../services/notification.service');

module.exports.sockets = (io) => {
    io.on('connection', socket => {

        socket.on('heatbeat', data => {
            io.emit('heartbeat', data);
        })

        socket.on('join', user => {
            socket.join(String(user._id));
            socket.join(String(user.department));
            io.emit('onJoin');
        });

        socket.on('request', requestForm => {
            if (requestForm) {
                createRequest(io, requestForm);
            }
        });

        socket.on('updateRequest', requestForm => {
            if (requestForm) {
                updateRequest(io, requestForm);
            }
        });

        socket.on('updateNotification', user => {
            if (user) {
                updateNotification(user);
            }
        })

    });
}