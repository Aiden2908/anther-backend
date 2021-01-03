module.exports = (app, expect, request) => {
  //signup
  const invalidEmail = require("./_invalid-email");
  const shortPassword = require("./_short-password");
  const shortName = require("./_short-name");
  const validCredentials = require("./_valid-credentiails");

  describe("POST /api/user/auth/signup", async () => {
    invalidEmail(app, expect, request);
    shortPassword(app, expect, request);
    shortName(app, expect, request);
    // validCredentials(app, expect, request);
  });
};
