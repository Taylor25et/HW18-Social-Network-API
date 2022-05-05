const { User } = require('../models');

// const userController = {
//     getUsers(req, res){

//     },
//     createUser(req, res) {
//         User.create(req.body)
//           .then((user) => res.json(user))
//           .catch((err) => res.status(500).json(err));
//       },
// };

module.exports = {
    //get all users
    getUser(req, res){
        User.find().then((user) => res.json(user)).catch((err) => res.status(500).json(err));
    },
};
