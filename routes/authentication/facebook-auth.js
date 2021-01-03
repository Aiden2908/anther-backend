// router = require("express").Router();
const passport = require("passport");

module.exports = (router, prisma, createAuthToken) => {
  //create facebook strategy
  const FacebookStrategy = require("passport-facebook").Strategy;

  const facebookOptions = {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: process.env.BASE_URL + "/api/auth/facebook/callback",
    profileFields: ["id", "displayName", "photos", "email"],
  };

  const facebookCallback = (accessToken, refreshToken, profile, cb) => {
    cb(profile);
  };

  passport.use(new FacebookStrategy(facebookOptions, facebookCallback));

  function callbackHandlerMiddleware(req, res, next) {
    //on facebook data recieved
    passport.authenticate("facebook", async function (user) {
      if (user.id) {
        let { id, displayName, emails, photos } = user;

        //check if user already exists in databse
        const _user = await prisma.users.findFirst({
          where: { email: id + "@facebook.com" },
        });
        //signin user with facebook
        if (_user) {
          //user exists, create and send token
          const jwtToken = createAuthToken(_user.id, _user.email, _user.name);
          return res.status(200).json({
            token: jwtToken,
            id: _user.id,
            email: _user.email,
            name: _user.name,
          });
        } else {
          // //singup user up with facebook
          const newUser = await prisma.users.create({
            data: {
              email: id + "@facebook.com",
              name: displayName,
              password: "",
            },
          });
          const jwtToken = createAuthToken(
            newUser.id,
            newUser.email,
            newUser.name
          );
          return res.status(200).json({
            token: jwtToken,
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          });
        }
      } else {
        res.status(404).send({
          error:
            "sorry, failed to authenticate with facebook, please try again.",
        });
      }
    })(req, res, next);
  }

  //route to facebook api
  router.get(
    "/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  //the route called back when from facebook after authentication
  router.get("/facebook/callback", (req, res, next) => {
    callbackHandlerMiddleware(req, res, next);
  });
};
