import mongoose from 'mongoose';
import config from '../../config';
import fs from 'fs';
import { argsFilter } from '../../lib/util';
const File = mongoose.model('File');
const Signup = mongoose.model('Signup');
export default async req => {
  const args = await argsFilter(req.body, {
    userId: ['required', 'string']
  });
  const {file} = req;
  console.log(file, 'filefilefile')
  const obj = new File({
    name: file.filename,
    path: file.path,
    size: file.size,
    type: file.mimetype,
    original_name: file.originalname,
    deleted: false
  });
  await obj.save();

  console.log(obj, 'objobjobjobj')
  // 获取之前用户的头像id,用户存的是头像id
  const user = await Signup.findOne({_id: args.userId}, {avatar: 1});
  // 通过id获取之前头像的name和path
  const prevAvatar = await File.findOne({_id: user.avatar}, {name: 1, path: 1});
  // File中删除之前用户的头像
  await File.remove({_id: user.avatar});
  // 删除图片文件
  if (prevAvatar) {
    fs.unlinkSync(prevAvatar.path);
  }
  // 关联新头像id至用户
  await Signup.findOneAndUpdate(
    { _id: args.userId },
    { $set: { avatar: obj._id } },
    { new: true, fields: { avatar: 1 } }
  );
  return {
    code: config.code.success,
    data: {
      name: obj.name
    }
  };
};
