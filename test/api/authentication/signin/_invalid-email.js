module.exports = (app, expect, request) => {
  it("OK, signin with invalid email", (done) => {
    request(app)
      .post("/api/auth/signin")
      .send({
        email: "testail.com",
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
