module.exports = (app, expect, request) => {
  it("OK, signup with right credentials", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@gmail.com",
        name: "username",
        password: "test1234",
      })
      .then((res) => {
        const body = res.body;
        console.log(body);
        expect(body).to.contain.property("id");
        expect(body).to.contain.property("email");
        expect(body).to.contain.property("name");
        done();
      })
      .catch((err) => done(err));
  });
};
