const router = require("express").Router();

//http://localhost:5000/api/ping
router.get("/", (req, res) => {
  res.status(200).json({ ping: "success" });
});

module.exports = router;
