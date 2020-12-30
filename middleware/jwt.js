const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = function auth(req, res, next) {
  //validate token
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("access denied");

  try {
    const vefied = jwt.verify(token, process.env.TOKEN_SECRET);
    //add token obj, ie user id into req
    req.user = vefied;

    //update user last activity time
    async (id) => {
      const user = await prisma.users.update({
        where: { id: id },
        data: { lastActiveAt: new Date() },
      });
      console.log("lastActive", user);
    };
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
