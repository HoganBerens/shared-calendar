const Group = require("../../models/group");
const User = require("../../models/user");
const Event = require("../../models/event");

async function create(req, res) {
  await Group.create({
    title: req.body.title,
    users: [req.body.user._id],
    user: req.body.user._id,
  });
  let groups = await Group.find({ user: req.body.user._id }).lean().exec();
  res.send(groups);
}

async function getAll(req, res) {
  let groups = await Group.find({ users: req.params.id }).lean().exec();
  res.send(groups);
}

async function show(req, res) {
  let group = await Group.findOne({ _id: req.params.id }).lean().exec();
  let users = [];
  for (u of group.users) {
    let person = await User.findById(u).lean().exec();
    users.push(person);
  }
  let user = await User.findById(group.user._id).lean().exec();
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

async function addEvent(req, res) {
  let event = await Event.findById(req.body.event);
  await Group.findOne({ title: req.params.id })
    .then((response) => {
      response.events.push(event);
      response.save();
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  create,
  getAll,
  show,
  addUser,
  addEvent,
};
