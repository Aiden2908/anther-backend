module.exports = (app, expect, request) => {
  it("OK, signup with short name", (done) => {
    request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@gmail.com",
        name: "ur",
        password: "tesa",
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
