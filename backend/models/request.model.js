const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  },
  isApproved: {
    type: Boolean,
    default: false
  }, 
  isRejected: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'request'
  }
}, { timestamps: true, collection: 'request' });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;