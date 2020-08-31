const userService = require('../services/user.service');

module.exports.getUsersByDepartment = (req, res) => {
    userService.getUsersByDepartment(req.params)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: "Error occurred!", err });
        })
}