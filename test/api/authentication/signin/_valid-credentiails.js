module.exports = (app, expect, request) => {
  it("OK, signin with right credentials ", (done) => {
    request(app)
      .post("/api/auth/signin")
      .send({
        email: "test@gmail.com",
        password: "test1234",
      })
      .then((res) => {
        const body = res.body;
        console.log(body);
        expect(body).to.contain.property("token");
        expect(body).to.contain.property("id");
        expect(body).to.contain.property("email");
        expect(body).to.contain.property("name");
        done();
      })
      .catch((err) => done(err));
  });
};
