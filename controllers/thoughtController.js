const { User, Thought } = require("../models");

module.exports = {
  //get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought id not found...." })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create thoughts to user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
          console.log(thoughts)
          return User.findOneAndUpdate({username: thoughts.username}, {$push: {thoughts: thoughts._id}}, {new: true})
      })
      .then((user) => {
          console.log(user)
          res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought id not found...." })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete thought & their thoughts :'(
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought id not found...." })
          : Thought.deleteMany({ _id: { $in: thought.thoughts } })
      )
      .then(() =>
        res.json({ message: "Thought and their thoughts have been deleted..." })
      )
      .catch((err) => res.status(500).json(err));
  },
};
