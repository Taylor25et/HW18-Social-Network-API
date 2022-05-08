const { User, Thought } = require("../models");

module.exports = {
  //get all users
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //get user by user Id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select(["-__v"])
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
      .catch((err) => res.status(500).json(err));
  },
  //create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //update username by user id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User id not found...." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete user & their thoughts :'(
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User id not found...." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and their thoughts have been deleted..." })
      )
      .catch((err) => res.status(500).json(err));
  },
  //add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) =>
        !user
          ? res.status(404).json({ message: 'This user does not exist. Unable to add friend...' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
   // Remove friend from a user
   deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'This user does not exist. Unable to delete friend...' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
