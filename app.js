//import express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//databse connection
const conn = require("./database/db_conn");
conn
  .authenticate()
  .then(() => console.log("Connection to database was sucessful."))
  .catch((err) => console.log("Erorr: " + err));

//import routes
//import authentication routes
const authRoutes = require("./routes/route-auth");

app.use("/api/user", authRoutes);

//listen on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
