const { Request } = require('../models');

module.exports.createRequest = (request) => new Promise((resolve, reject) => {
    Request.create(request)
        .then((request) => {
            resolve(request);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.updateRequest = (_id, data) => new Promise((resolve, reject) => {
    Request.findOneAndUpdate({ _id }, { $set: data }, { new: true })
        .then((request) => {
            resolve(request);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getRequestByDepartment = (department) => new Promise((resolve, reject) => {
    Request.find({ department })
        .then((request) => {
            resolve(request);
        })
        .catch((err) => {
            reject(err);
        })
})