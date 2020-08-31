const authService = require('../services/auth.service');

module.exports.login = (req, res) => {
    authService.login(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: "Error occurred!", err });
        })
}