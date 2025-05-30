import mongoose from 'mongoose';

export interface IUsers {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  _confirmPassword?: string;
}

export const userSchema = new mongoose.Schema<IUsers>(
  {
    username: {
      type: String,
      required: [true, '用户名不能为空'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, '密码不能为空'],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        '邮箱格式不正确',
      ],
    },
    phone: {
      type: String || Number,
      match: [
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[01256789]))\d{8}$/,
        '手机号码不正确',
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      // 转换为 json 时 的配置及操作
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        delete ret.confirmPassword;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      // 转换为 object 时 的配置及操作
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        delete ret.confirmPassword;
        delete ret.__v;
        return ret;
      },
    },
  },
);
userSchema
  .virtual('confirmPassword')
  .get(function (): string {
    return this._confirmPassword || '';
  })
  .set(function (value: string) {
    this._confirmPassword = value;
  });

userSchema.pre('validate', function (next) {
  if (this.password !== this._confirmPassword) {
    this.invalidate('confirmPassword', '两次输入的密码不一致');
  }
  next();
});
