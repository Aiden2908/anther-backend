router = require("express").Router();
const verify = require("../../middleware/jwt");

router.get("/", verify, (req, res) => {
  const data = {
    data: "this is data",
  };

  res.send(req.user);
});
module.exports = router;
