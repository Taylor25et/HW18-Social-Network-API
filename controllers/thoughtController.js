const { User, Thought } = require("../models");
const mongoose = require('mongoose');

module.exports = {
  //get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get thought by thought id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select(["-__v"])
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought id not found...." })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create thought to and add to a user
  createThought(req, res) {
    User.findOne({ _id: req.body.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User id is invalid. Thought creation unsuccessful..." });
        } else {
          Thought.create({
            thoughtText: req.body.thoughtText,
            username: user.username,
          })
            .then((thought) => {
              return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
              );
            })
            .then((thought) => res.status(200).json(thought))
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //update thought by thought id
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
  //delete a thought by thought id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought id not found...." })
          : Thought.deleteMany({ _id: { $in: thought.thoughts } })
      )
      .then(() => res.json({ message: "This thought has been deleted..." }))
      .catch((err) => res.status(500).json(err));
  },
  //adding a reaction to a thought 
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'This thought does not exist. Unable to add a reaction...' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
   // Remove reaction from a thought 
   deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: mongoose.Types.ObjectId(req.body.reactionId) } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'This thought does not exist. Unable to delete reaction...' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
