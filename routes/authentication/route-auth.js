const router = require("express").Router();
const User = require("../../models/user");
const { signupSchema, loginSchema } = require("../../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//authentication routes
router.post("/signup", async (req, res) => {
  //validation
  let { error } = signupSchema().validate(req.body);
  if (error) {
    return res.status(400).send({ invalid: error.details[0].message });
  } else {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      lastActive: Date.now(),
    };

    User.create(user)
      .then(({ email, username, createdAt } = user) => {
        //user insertion successful
        return res.status(200).send({ email, username, createdAt });
      })
      .catch(({ errors } = err) => {
        //user insertion unsuccessful
        let { value, type } = errors[0];
        //duplicate value errors
        if (type == "unique violation")
          return res
            .status(406)
            .send({ duplicate: `${value} is already in use.` });
        else {
          return res.status(404).send(errors);
        }
      });
  }
});

router.post("/signin", async (req, res) => {
  //validation
  let { error } = loginSchema().validate(req.body);
  if (error) {
    return res.status(400).send({ invalid: error.details[0].message });
  } else {
    //find user with email
    User.findAll({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (user.length !== 0)
          //found email match
          return (
            bcrypt
              //decrypt password & compare
              .compare(req.body.password, user[0].password)
              .then((result) => {
                if (result) {
                  //create JWT token
                  const token = jwt.sign(
                    { id: user[0].id },
                    process.env.TOKEN_SECRET
                  );
                  return res
                    .header("auth-token", token)
                    .send({ authKey: token });
                } else {
                  return res
                    .status(404)
                    .send({ invalid: "Invalid username or password" });
                }
              })
          );
        else
          return res
            .status(404)
            .send({ invalid: "Invalid username or password" });
      })
      .catch((err) => console.log(err));
  }
});

//facebook api
require("../authentication/facebook")(router);

module.exports = router;
