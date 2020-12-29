const expect = require("chai").expect; //assertion lib
const request = require("supertest"); //handles calling api

const app = require("../../../app");

describe("POST /api/user/auth", () => {
  //login with invalid email
  it("OK, login with invalid email", (done) => {
    request(app)
      .post("/api/user/auth/signin")
      .send({ email: "testail.com", password: "test1234" })
      .then((res) => {
        const body = res.body;
        //console.log(body);
        expect(body).to.contain.property("invalid");
        done();
      })
      .catch((err) => done(err));
  });
  //login with short password
  it("OK, login with short password", (done) => {
    request(app)
      .post("/api/user/auth/signin")
      .send({ email: "test@gmail.com", password: "tes" })
      .then((res) => {
        const body = res.body;
        //console.log(body);
        expect(body).to.contain.property("invalid");
        done();
      })
      .catch((err) => done(err));
  });

  //signup with invalid email
  it("OK, signup with invalid email", (done) => {
    request(app)
      .post("/api/user/auth/signup")
      .send({
        email: "testail.com",
        username: "username",
        password: "test1234",
      })
      .then((res) => {
        const body = res.body;
        //console.log(body);
        expect(body).to.contain.property("invalid");
        done();
      })
      .catch((err) => done(err));
  });
  //signup with short username
  it("OK, signup with short username", (done) => {
    request(app)
      .post("/api/user/auth/signup")
      .send({ email: "test@gmail.com", username: "us", password: "test1234" })
      .then((res) => {
        const body = res.body;
        //console.log(body);
        expect(body).to.contain.property("invalid");
        done();
      })
      .catch((err) => done(err));
  });
  //signup with short password
  it("OK, signup with short password", (done) => {
    request(app)
      .post("/api/user/auth/signup")
      .send({ email: "test@gmail.com", username: "username", password: "tes" })
      .then((res) => {
        const body = res.body;
        //console.log(body);
        expect(body).to.contain.property("invalid");
        done();
      })
      .catch((err) => done(err));
  });

  //signup with valid credentials
  it("OK, signup with valid credentials", (done) => {
    request(app)
      .post("/api/user/auth/signup")
      .send({
        email: "elise@gmail.com",
        username: "elise",
        password: "elise1234",
      })
      .then((res) => {
        const body = res.body;
        //console.log(body);
        expect(body).to.contain.property("email");
        expect(body).to.contain.property("username");
        expect(body).to.contain.property("createdAt");
        done();
      })
      .catch((err) => done(err));
  });

  //login with valid credentials
  it("OK, login with valid credentials", (done) => {
    request(app)
      .post("/api/user/auth/signin")
      .send({ email: "elise@gmail.com", password: "elise1234" })
      .then((res) => {
        const body = res.body;
        //console.log(body);
        expect(body).to.contain.property("authKey");
        done();
      })
      .catch((err) => done(err));
  });
});
