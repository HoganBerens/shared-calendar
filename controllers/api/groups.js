const Group = require("../../models/group");
const User = require("../../models/user");

async function create(req, res) {
  const group = await Group.create({
    title: req.body.title,
    user: req.body.user.userID,
  });
  User.find({ userID: req.body.user.userID })
    .then((user) => {
      user[0].groups.push(group);
      user[0].save();
    })
    .catch((error) => {
      console.log({ error });
    });
  res.json(group);
}

async function getAll(req, res) {
  User.find({ userID: req.params.id })
    .then((user) => {
      let groups = user[0].groups;

      res.send(groups);
    })
    .catch((error) => {
      console.log({ error });
    });
}

async function show(req, res) {
  let group = await Group.find({ group: req.params.id }).exec();
  res.send(group);
}

module.exports = {
  create,
  getAll,
  show,
};
