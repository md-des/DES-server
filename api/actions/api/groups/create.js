import mongoose from "mongoose";
import { code } from "../../config";
import { argsFilter } from "../../lib/util";

const Group = mongoose.model("Groups");

export default async req => {
  const args = await argsFilter(req.body, {
    creator: ["required", "string"],
    group_name: ["required", 'string'],
    posts: "array",
    members: "array"
  });
  const group = new Group(args);
  await group.save();
  return { code: code.success };
};
