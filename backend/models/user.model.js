const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('underscore');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false
  },
  department: {
    type: mongoose.Schema.Types.ObjectId
  },
  type: {
    type: String,
    default: 'user'
  }
}, { timestamps: true, collection: 'user' });

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    return next();
  }, err => next(err));
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    if (_.isNull(this.password) || _.isUndefined(this.password)) {
      return resolve(false)
    }
    bcrypt.compare(candidatePassword, this.password)
      .then((isMatch) => {
        resolve(isMatch);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
