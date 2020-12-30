module.exports = (app, expect, request) => {
  //signup
  const invalidEmail = require("./invalid-email");
  const shortPassword = require("./short-password");
  const shortName = require("./short-name");
  const validCredentials = require("./valid-credentiails");

  describe("POST /api/user/auth/signup", async () => {
    invalidEmail(app, expect, request);
    shortPassword(app, expect, request);
    shortName(app, expect, request);
    // validCredentials(app, expect, request);
  });
};
