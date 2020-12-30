//express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//.env
const dotenv = require("dotenv");
dotenv.config();

//routes
const appAuthRoute = require("./routes/authentication/app-auth"); //authentication routes
const homeRoute = require("./routes/private/route-home");

//middleware
app.use(express.json());
app.use("/api/user/auth", appAuthRoute);
app.use("/api/anther", homeRoute);

//databse connection

//listen on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
