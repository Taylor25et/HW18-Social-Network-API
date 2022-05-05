const router = require("express").Router();

const { createUser } = require("../../controllers/userController");

router.route("/").get().post(createUser);

module.exports = router;
