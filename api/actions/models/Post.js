import mongoose from "mongoose";
import { getTime } from "../lib/util";
const ObjectId = mongoose.Schema.Types.ObjectId;

export const enums = {
  status: ["public", "draft"] // 'public'：已发布文章 'draft'：草稿
};

// 申请
const schema = mongoose.Schema({
  postId: ObjectId,
  title: String, // 标题
  author: String,
  content: String, // 内容
  type: { type: String, enums: enums.status }, // 类型 'public'：已发布文章 'draft'：草稿
  deleted: { type: Boolean, default: false },
  create_time: { type: Number, default: getTime },
  update_time: Number
});
// 申请
// const schema = mongoose.Schema({
//   doctor: String, // 医生名
//   phone: String, // 电话号码
//   role: String, // 职位
//   account: String, // 账户
//   type: { type: String, enums: ["0", "1"] }, // 类型 '0'：新开账号 '1'：密码重置
//   status: { type: String, enum: enums.status, default: "0" }, // 审核状态
//   operator: { type: ObjectId, ref: "Admin" }, // 审核者
//   deleted: { type: Boolean, default: false },
//   create_time: { type: Number, default: getTime },
//   update_time: Number,
//   correlate: ObjectId
// });
export default mongoose.model("Post", schema);
