const router = require("express").Router();
const {
  signupSchema,
  loginSchema,
} = require("../../validation/auth-validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//authentication routes
router.post("/signup", async (req, res) => {
  //validation
  let { error } = signupSchema().validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
      let user = await prisma.users.create({
        data: {
          email: req.body.email,
          // name: req.body.name,
          password: hashedPassword,
        },
      });
      let { id, email } = user;
      //Create new details row
      const details = await prisma.users_details.create({
        data: {
          users: {
            connect: {
              id: parseInt(id),
            },
          },
        },
      });
      return res.status(200).json({ id, email, details });
    } catch (error) {
      //check if email is already in use
      if (error.meta) {
        const { target } = error.meta;
        if (target === "email_unique")
          return res
            .status(406)
            .json({ error: `Sorry, ${req.body.email} is already in use.` });
        console.log(error);
        return res.status(500).json({ error: "something went wrong" });
      }
    }
  }
});

router.post("/signin", async (req, res) => {
  //form validation
  let { error } = loginSchema().validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //find user with email
  const user = await prisma.users.findFirst({
    where: { email: req.body.email },
  });

  if (user) {
    //decrypt password
    decryptResult = await bcrypt.compare(req.body.password, user.password);

    //password decrypt result is true
    if (decryptResult) {
      const { id, email, name } = user;
      //create & asign jwt token
      const jwtToken = createAuthToken(id, email, name);
      return res.status(200).json({ token: jwtToken, id, email, name });
    }
  }
  //password decrypt result is false
  return res.status(404).json({
    error: "Sorry, the email or password is incorrect, please try again.",
  });
});

function createAuthToken(id, email, name) {
  //update user activity
  return (jwtToken = jwt.sign(
    { id: id, email: email, name: name },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "72h",
    }
  ));
}

//facebook api
require("./facebook-auth")(router, prisma, createAuthToken);

module.exports = router;
