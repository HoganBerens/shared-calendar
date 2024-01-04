const Group = require("../../models/group");
const User = require("../../models/user");

async function create(req, res) {
  let user = await User.findById(req.body.user._id);
  let group = await Group.create({
    title: req.body.title,
    users: [user],
    user: user,
  });
  res.send(group);
}

async function getAll(req, res) {
  let groups = await Group.find({ users: req.params.id });
  res.send(groups);
}

async function show(req, res) {
  let group = await Group.findOne({ _id: req.params.id }).lean().exec();
  let users = [];
  for (let i = 0; i < group.users.length; i++) {
    let person = await User.findOne({ _id: group.users[i] }).lean().exec();
    users.push(person);
  }
  let user = await User.findOne({ _id: group.user._id }).lean().exec();
  let data = { group: group, user: user, users: users };
  res.send(data);
}

async function addUser(req, res) {
  let group;
  let user;
  await Group.findById(req.body.group).then((response) => {
    group = response;
  });
  await User.findById(req.body.user).then((response) => {
    user = response;
  });
  group.users.push(user);
  group.save();
}

module.exports = {
  create,
  getAll,
  show,
  addUser,
};
