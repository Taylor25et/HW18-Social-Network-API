const router = require("express").Router();

const {
    getThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
  } = require("../../controllers/thoughtController");
  
  router.route("/").get(getThought).post(createThought);
  
  router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports = router;