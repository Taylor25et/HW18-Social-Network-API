const router = require("express").Router();

const {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getUser).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
