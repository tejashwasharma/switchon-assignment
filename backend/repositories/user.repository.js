const mongoose = require('mongoose');
const { User } = require('../models');

module.exports.createUser = (user) => new Promise((resolve, reject) => {
    User.create(user)
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getUsers = () => new Promise((resolve, reject) => {
    User.find({})
        .then((users) => {
            resolve(users);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getUserByUsername = (username, forceField) => new Promise((resolve, reject) => {
    User.findOne({ username }).select(forceField)
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getUserBydepartment = (department, forceField) => new Promise((resolve, reject) => {
    department = typeof department === 'string' ? mongoose.Types.ObjectId(department) : department;
    User.find({ department }).select(forceField)
        .then((user) => {
            resolve(user);
        })
        .catch((err) => {
            reject(err);
        })
})