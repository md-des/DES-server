import mongoose from 'mongoose';
import { code } from '../../config';
import { argsFilter } from '../../lib/util';

const Post = mongoose.model('Post');

export default async req => {
  const args = await argsFilter(req.query, {
    id: ["required", "string"]
  });
  // 只输出title和content
  const detail = await Post.findOne({_id: args.id}, {title: 1, content: 1});

  return {
    code: code.success,
    data: {
      detail
    }
  };
};
