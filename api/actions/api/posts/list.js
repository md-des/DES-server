import mongoose from 'mongoose';
import { code } from '../../config';
import { argsFilter } from '../../lib/util';
import {roleAuthPromise} from "../../lib/auth";
const Post = mongoose.model('Post');

export default async req => {
  const args = await argsFilter(req.query, {
    author: ["required", "string"]
  });
  console.log(req.session.user, 'req.session.user')
  await roleAuthPromise(req, 'read', 'post');
  // 不输出content
  const docs = await Post.find({author: args.author, deleted: false}, {content: 0}).sort({create_time: -1});

  return {
    code: code.success,
    data: {
      docs
    }
  };
};
