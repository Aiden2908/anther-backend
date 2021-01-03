//express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//.env
const dotenv = require("dotenv");
dotenv.config();

//routes
const authRoutes = require("./routes/authentication/app-auth"); //authentication routes
const antherRoutes = require("./routes/private/anther");

//middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/anther", antherRoutes);

//listen on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
