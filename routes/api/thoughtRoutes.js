const router = require("express").Router();

const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
  } = require("../../controllers/thoughtController");
  
  router.route("/").get(getThought).post(createThought);
  
  router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);

  router.route("/:thoughtId/reactions/:reactionId").post(addReaction).delete(deleteReaction);

module.exports = router;