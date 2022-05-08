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
      Thought.create(req.body).then((thoughtProcess) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtProcess._id } },
            { new: true }
        )
      })
      .then((user) =>
      !user
        ? res.status(404).json({ message: "Thought id not found...." })
        : res.status(200).json(user)).catch((err) => res.status(500).json(err))
      },
  
  
  
  
  
//   createThought(req, res) {
//     User.findOne({ _id: req.body.userId })
//     .then((user) =>
//       !user
//         ? res.status(404).json({message: "No user found with this id. Could not add thought....."})
//         : Thought.create({
//             thoughtText: req.body.thoughtText,
//             username: user.username
//         })
//             .then((thought) => {
//               return User.findOneAndUpdate(
//                 { _id: req.body.userId },
//                 { $addToSet: { thoughts: thought._id } },
//                 { runValidators: true, new: true })
//             )
//             .catch((err) => {
//                 console.log(err);
//                 res.status(500).json(err);
//               });
//   },

  //   createThought(req, res) {
  //     User.findOneAndUpdate({ _id: req.params.userId })
  //     .then((user) => {
  //         if (!user) {
  //             return res.status(404).json({ message: "No user found with this id. Could not add thought....." })
  //         } else {
  //             Thought.create({
  //                 thoughtText: req.body.thoughtText,
  //                 userId: req.body.userId,
  //             })
  //             .then((thought) => res.json(thought))
  //             .catch((err) => res.status(500).json(err))
  //         }

  //     }),

  //update thought by id
  updateThought(req, res) {
    console.log("You are adding an thought");
    console.log(req.body);
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
