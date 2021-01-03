module.exports = (app, expect, request) => {
  it("OK, signup with invalid email", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "testail.com",
        name: "username",
        password: "test1234",
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
