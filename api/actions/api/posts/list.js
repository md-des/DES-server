import mongoose from 'mongoose';
import { code } from '../../config';
import { argsFilter } from '../../lib/util';

const Post = mongoose.model('Post');

export default async req => {
  const args = await argsFilter(req.query, {
    author: ["required", "string"]
  });
  // 不输出content
  const docs = await Post.find({author: args.author}, {content: 0}).sort({ create_time: -1 });

  console.log(docs, 'docs');
  return {
    code: code.success,
    data: {
      docs
    }
  };
};
