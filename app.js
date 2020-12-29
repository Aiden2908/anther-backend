//express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//.env
const dotenv = require("dotenv");
dotenv.config();

//routes
const authRoutes = require("./routes/authentication/route-auth"); //authentication routes
const homeRoute = require("./routes/private/route-home");

//middleware
app.use(express.json());
app.use("/api/user/auth", authRoutes);
app.use("/api/anther", homeRoute);

//databse connection
const conn = require("./database/db_conn");
conn
  .authenticate()
  .then(() => {
    console.log("Connection to database was sucessful.");

    //listen on port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Erorr: " + err));

module.exports = app;
