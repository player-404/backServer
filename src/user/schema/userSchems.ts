import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, '用户名不能为空'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, '密码不能为空'],
  },
  emial: String,
  phone: String,
});
