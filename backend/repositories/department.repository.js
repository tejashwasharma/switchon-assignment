const { Department } = require('../models');

module.exports.createDepartment = (department) => new Promise((resolve, reject) => {
    Department.create(department)
        .then((department) => {
            resolve(department);
        })
        .catch((err) => {
            reject(err);
        })
})

module.exports.getDepartments = () => new Promise((resolve, reject) => {
    Department.find({})
        .then((departments) => {
            resolve(departments);
        })
        .catch((err) => {
            reject(err);
        })
})