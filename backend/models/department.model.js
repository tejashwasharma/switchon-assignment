const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'department'
  }
}, { timestamps: true, collection: 'department' });

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;