const router = require("express").Router();
//might need to pull in user module
// const { User } = require('../../models');
const { getUsers, createUser } = require("../../controllers/userController");

router.route('/').get(getUsers).post(createUser);

module.exports = router;
