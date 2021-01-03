const expect = require("chai").expect; //assertion lib
const request = require("supertest"); //handles calling api

const app = require("../../../app");

const signup = require("../authentication/signup/signup-tests");
const signin = require("../authentication/signin/signin-tests");

signup(app, expect, request);
signin(app, expect, request);
