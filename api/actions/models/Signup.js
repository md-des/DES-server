import mongoose from "mongoose";
import { getTime } from "../lib/util";
const ObjectId = mongoose.Schema.Types.ObjectId;

// export const enums = {
//   status: ["0", "1", "2"] // '0'：尚未审核 '1'：审核通过 '2'：审核未通过
// };

// 申请
const schema = mongoose.Schema({
  role: String, // 角色
  name: String, // name
  pass: String,
  avatar: String, // 头像
  type: { type: String }, // 类型 '0'：新开账号 '1'：密码重置
  deleted: { type: Boolean, default: false },
  create_time: { type: Number, default: getTime },
  update_time: Number,
  correlate: ObjectId
});

export default mongoose.model("Signup", schema);
