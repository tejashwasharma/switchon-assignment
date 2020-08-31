const populateDataService = require('../services/populateData.service');

module.exports.populateDummyDataInDB = (req, res) => {
    populateDataService.populateDummyDataInDB(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ message: "Error occurred!", err });
        })
}