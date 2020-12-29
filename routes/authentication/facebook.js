// router = require("express").Router();
const passport = require("passport");

module.exports = (router) => {
  //create facebook strategy
  const FacebookStrategy = require("passport-facebook").Strategy;

  const facebookOptions = {
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5000/api/user/auth/facebook/callback",
    profileFields: ["id", "displayName", "photos", "email"],
  };

  const facebookCallback = (accessToken, refreshToken, profile, cb) => {
    cb(profile);
  };

  passport.use(new FacebookStrategy(facebookOptions, facebookCallback));

  function callbackHandlerMiddleware(req, res, next) {
    passport.authenticate("facebook", function (user) {
      if (user) {
        let { id, displayName, emails, photos } = user;
        res.status(200).send({
          id: id,
          displayName: displayName,
          email: emails[0].value,
          photo: photos[0].value,
        });
      } else {
        res.status(404).send({ error: "failed to authenticate with facebook" });
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
