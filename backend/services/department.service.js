const departmentRepository = require('../repositories/department.repository');

module.exports.getallDepartments = () => new Promise(async (resolve, reject) => {
    try {
        let departments = await departmentRepository.getDepartments().catch((err) => reject(err));
        resolve(departments);        
    } catch (err) {
        reject(err);
    }

})