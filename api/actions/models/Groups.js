import mongoose from "mongoose";
import { getTime } from "../lib/util";
const ObjectId = mongoose.Schema.Types.ObjectId;


// 文章群组
const schema = mongoose.Schema({
  id: ObjectId, // 组id
  creator_id: String, // 组创建者id
  creator_name: String,// 组创建者name
  posts: Array, // 组文章id
  members: Array, // 组成员
  group_name: String, // 组名
  deleted: { type: Boolean, default: false },
  create_time: { type: Number, default: getTime },
  update_time: Number
});

export default mongoose.model("Groups", schema);
