//import router form express
router = require("express").Router();

//import user model
const User = require("../models/user");

//authentication routes
router.post("/signin", (req, res) => {
  User.create({
    email: "some",
    username: "ss",
    password: "p",
  })
    .then(res.sendStatus(200))
    .catch((err) => console.log(err));
});

router.post("/signup", (req, res) => {
  User.findAll()
    .then((user) => {
      console.log(user);
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
