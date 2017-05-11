'use strict';


import mongoose from 'mongoose';
import UserSchema from '../../schema/user/user';

// 使用mongoose的模型方法编译生成模型
const User = mongoose.model('User', UserSchema);

// 将模型构造函数导出
export default User