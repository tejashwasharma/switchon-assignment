const userRepository = require('../repositories/user.repository');

module.exports.getUsersByDepartment = ({ department }) => new Promise(async (resolve, reject) => {
    try {
        let users = await userRepository.getUserBydepartment(department).catch((err) => reject(err));
        resolve(users);        
    } catch (err) {
        reject(err);
    }

})