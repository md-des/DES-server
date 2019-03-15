import mongoose from 'mongoose';
import { code } from '../../config';
import { argsFilter } from '../../lib/util';
import { getIP, genToken, kExpirePeriod } from '../../lib/auth';
const Login = mongoose.model('Signup');
const File = mongoose.model('File');
export default async req => {
  const args = await argsFilter(req.body, {
    name: ['required', 'string'],
    pass: ['required', 'string']
  });
  const user = await Login.findOne({ name: args.name });
  // 通过id获取用户头像
  const avatar = await File.findOne({ _id: user.avatar }, { name: 1 });
  if (!user) {
    throw { code: code.fail, msg: '用户不存在！' };
  } else if (user.pass !== args.pass) {
    throw { code: code.fail, msg: '密码错误！' };
  } else {
    req.session.user = user;
    req.session.exp = Date.now() + kExpirePeriod;
    return {
      code: code.success,
      data: {
        user: {
          name: user.name,
          role: user.role,
          create_time: user.create_time,
          _id: user._id,
          avatar: avatar && avatar.name
        }
      }
    };
  }
};
