const Group = require("../../models/group");
const User = require("../../models/user");

async function create(req, res) {
  let user = await User.findById(req.body.user._id);
  let group;
  Group.create({
    title: req.body.title,
    user: user,
  })
    .then((people) => {
      people.users.prevUsers.push(user);
      people.save();
      group = people.toJSON();
    })
    .then(() => {
      user.groups.push(group);
      user.save();
    });
  res.send(group);
}

async function getAll(req, res) {
  User.find({ userID: req.params.id })
    .then((user) => {
      res.send(user[0].groups);
    })
    .catch((error) => {
      console.log({ error });
    });
}

async function show(req, res) {
  let group = await Group.find({ group: req.params.id }).exec();
  res.send(group);
}

async function addUser(req, res) {
  let group = await Group.findByIdAndUpdate(req.params.id, { users: { prevUsers: req.body.users, newUser: req.body.user } }, { new: true });
  res.json(group);
}

module.exports = {
  create,
  getAll,
  show,
  addUser,
};
