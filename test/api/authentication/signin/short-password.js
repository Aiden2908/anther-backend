module.exports = (app, expect, request) => {
  it("OK, signin with short password", (done) => {
    request(app)
      .post("/api/user/auth/signin")
      .send({
        email: "test@gmail.com",
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
