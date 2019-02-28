import mongoose from "mongoose";
import { code } from "../../config";
import { argsFilter } from "../../lib/util";
const User = mongoose.model('Signup');
const Group = mongoose.model("Groups");
const Post = mongoose.model('Post');
export const getMemberAndPostsDetails = async function(groups) {
  const newGroups = [];
  // 将members和posts通过id查出其对应的详情
  for (let j = 0; j < groups.length; j++) {
    const members = groups[j].members;
    const posts = groups[j].posts;
    const group = groups[j];
    group.members = [];
    group.posts = [];
    for (let i = 0; i < members.length; i++) {
      const member = await User.findOne({_id: members[i]}, {_id: 1, name: 1});
      group.members.push(member)
    }
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findOne({_id: posts[i], deleted: false}, {_id: 1, title: 1});
      group.posts.push(post)
    }
    newGroups.push(group)
  }
  return newGroups;
}
export default async req => {
  const args = await argsFilter(req.query, {
    creator_id: ["required", "string"]
  });
  // 自己创建的groups
  const myGroups = await Group.find({creator_id: args.creator_id}).sort({create_time: -1});
  // 参与的groups
  const participantGroups = await Group.find({members: {$in: [args.creator_id]}}).sort({create_time: -1});
  
 
  const myGroupsNew = await getMemberAndPostsDetails(myGroups)
  const participantGroupsNew = await getMemberAndPostsDetails(participantGroups)
  return {
    code: code.success,
    data: {
      my: myGroupsNew,
      participant: participantGroupsNew
    }
  };
};
