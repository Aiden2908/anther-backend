module.exports = (app, expect, request) => {
  //signup
  const invalidEmail = require("./invalid-email");
  const shortPassword = require("./short-password");
  const validCredentials = require("./valid-credentiails");

  describe("POST /api/user/auth/signin", async () => {
    invalidEmail(app, expect, request);
    shortPassword(app, expect, request);
    validCredentials(app, expect, request);
  });
};
