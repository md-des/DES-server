import mongoose from "mongoose";
import { code } from "../../config";
import { argsFilter } from "../../lib/util";

const Login = mongoose.model("Signup");

export default async req => {
  const args = await argsFilter(req.body, {
    name: ["required", "string"],
    pass: ["required", "string"]
  });
  const user = await Login.findOne({name: args.name});
  if (!user) {
    throw { code: code.fail, msg: "用户不存在！" };
  }
  if (user.pass !== args.pass) {
    throw { code: code.fail, msg: "密码错误！" };
  }
  return { code: code.success, data: {userId: user._id} };
};
