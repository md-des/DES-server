import mongoose from "mongoose";
import { getTime } from "../lib/util";
const ObjectId = mongoose.Schema.Types.ObjectId;


// 文章群组
const schema = mongoose.Schema({
  id: ObjectId,
  creator: String,
  posts: Array,
  members: Array,
  group_name: String,
  deleted: { type: Boolean, default: false },
  create_time: { type: Number, default: getTime },
  update_time: Number
});

export default mongoose.model("Groups", schema);
