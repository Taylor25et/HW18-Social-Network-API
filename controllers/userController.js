const { User, Thought } = require("../models");

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .then((user) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.objectId })
      .select("-__v")
      .populate("thoughts")
      .populate({
        path: "friends",
        select: ["-__v"],
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User id not found...." })
          : res.status(200).json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //create users
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
