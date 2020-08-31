const userRepository = require('../repositories/user.repository');
const departmentRepository = require('../repositories/department.repository');

module.exports.populateDummyDataInDB = () => new Promise(async (resolve, reject) => {
    try {
        let data = { department: [], user: [] }, department, users, user;
        const password = 'password';
        department = await departmentRepository.getDepartments().catch(err => reject(err));
        if (!department.length) {
            for (const departmentKey in [0, 1]) {
                department = await departmentRepository.createDepartment({ name: `Department ${departmentKey}` }).catch(err => reject(err));
                data.department.push(department);
                for (const userKey in [0, 1, 2]) {
                    user = await userRepository.createUser({ name: `user ${departmentKey}${userKey}`, username: `user${departmentKey}${userKey}`, password: password, department: department._id }).catch(err => reject(err));
                    data.user.push(user);
                }
            }
        } else {
            data.department = department;
            users = await userRepository.getUsers().catch(err => reject(err));
            data.user = users;
        }
        data.user.map(user => {
            user.password = password;
            return user;
        })
        resolve(data);
    } catch (err) {
        console.log('err: ', err);
        reject(err);
    }
})