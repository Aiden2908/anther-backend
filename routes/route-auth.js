router = require("express").Router();
const User = require("../models/user");
const { signupSchema, loginSchema } = require("../validation");

//authentication routes
router.post("/signup", (req, res) => {
  let { error } = signupSchema().validate(req.body); //validation

  if (error) {
    res.send(error.details[0].message);
  } else {
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    User.create(user)
      .then(({ email, username, createdAt } = user) => {
        res.send({ email, username, createdAt });
      })
      .catch(({ errors } = err) => {
        let { value, type } = errors[0];
        if (type == "unique violation") res.send(`${value} is already in use.`);
        else {
          res.sendStatus(404);
          console.log("ERROR::AUTH-SIGNUP", errors);
        }
      });
  }
});

router.post("/signin", (req, res) => {
  User.findAll()
    .then(res.sendStatus(200))
    .catch((err) => console.log(err));
});
module.exports = router;
