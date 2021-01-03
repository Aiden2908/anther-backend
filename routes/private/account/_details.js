const { reset } = require("nodemon");

module.exports = (router, prisma, verify) => {
  // router.use(verify);

  //get details
  router.get("/details/:id", async (req, res) => {
    const details = await prisma.users_details.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    return res.status(200).json({ details: details });
  });

  //create details
  router.post("/details/:id", async (req, res) => {
    try {
      const details = await prisma.users_details.create({
        data: {
          users: { connect: { id: parseInt(req.params.id) } },
        },
      });
      return res.status(200).json({ details: details });
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Sorry, something went wrong, please try again." });
    }
  });

  //update a user_details attribute(s)
  //PUT -> BODY -> {"data": {"drink_alcohol": "No", "school": "Auckalnd university"}
  router.put("/details/:id", async (req, res) => {
    try {
      await prisma.users_details.update({
        where: { id: parseInt(req.params.id) },
        data: req.body.data,
      });
      return res.status(200).json(req.body.data);
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Sorry, something went wrong, please try again. " });
    }
  });
};
