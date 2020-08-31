const departmentService = require('../services/department.service');

module.exports.getallDepartments = (req, res) => {
    departmentService.getallDepartments()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: "Error occurred!", err });
        })
}