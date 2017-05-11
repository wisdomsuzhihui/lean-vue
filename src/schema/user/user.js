'use strict';

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,

  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});
UserSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next()
})
// UserSchema.pre('save', function(next) {
//   // const user = this;
//   if (this.isNew) {
//     this.meta.createAt = this.meta.updateAt = Date.now();
//   } else {
//     this.meta.updateAt = Date.now();
//   }

//   next()
// })

// 实例方法


// 给模型添加静态方法

UserSchema.statics = {
  fetch(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb);
  }
};

module.exports = UserSchema;