'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');


export default {
  loginByEmail: config => {
    const {
      _email
    } = config.params;

    return new Promise((resolve, reject) => {
      User.findOne({
        email: _email
      }, (err, user) => {
        if (err) {
          reject(err);
        }
        if (!user) {
          reject('xxx')
        }
      })
      console.log(email)
      reject('账号不正确2')
    })
  }
}