module.exports = (app, expect, request) => {
  it("OK, signup with short password", (done) => {
    request(app)
      .post("/api/user/auth/signup")
      .send({
        email: "test@gmail.com",
        name: "username",
        password: "tes",
      })
      .then((res) => {
        const body = res.body;
        console.log(body);
        expect(body).to.contain.property("error");
        done();
      })
      .catch((err) => done(err));
  });
};
