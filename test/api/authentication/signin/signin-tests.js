module.exports = (app, expect, request) => {
  //signup
  const invalidEmail = require("./_invalid-email");
  const shortPassword = require("./_short-password");
  const validCredentials = require("./_valid-credentiails");

  describe("POST /api/auth/signin", async () => {
    invalidEmail(app, expect, request);
    shortPassword(app, expect, request);
    validCredentials(app, expect, request);
  });
};
