import mongoose from "mongoose";
import { code } from "../../config";
import { argsFilter } from "../../lib/util";

const Signup = mongoose.model("Signup");

export default async req => {
  const args = await argsFilter(req.body, {
    name: ["required", "string"],
    role: "string"
  });
  const count = await Signup.count({
    name: req.body.name
  }).exec();
  if (count) {
    throw { code: code.fail, msg: "重复申请！" };
  }
  args.type = "0";
  const signup = new Signup(args);
  await signup.save();
  return { code: code.success };
};
