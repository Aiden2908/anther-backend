const multer = require("multer");
const path = require("path");

module.exports = (router, prisma, verify) => {
  //Storage engine for photos
  const Storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "./public/uploads/userphotos");
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}`);
    },
  });

  const upload = multer({ storage: Storage });

  //uploads new profile picture and set photots JSON profile to photo path
  router.post(
    "/details/profilePicture",
    verify,
    upload.array("photo", 3),
    async (req, res) => {
      console.log("file path... ", req.files[0].path);
      try {
        const data = await prisma.$queryRaw(
          `UPDATE users_details SET photos = JSON_SET(photos, "$.profile", "${req.files[0].path}") WHERE id = ${req.user.id}`
        );
        return res.status(200).json({ upload: "success" });
      } catch (error) {
        return res
          .status(400)
          .json({ error: "Sorry, something went wrong, please try again. " });
      }
    }
  );

  //get avaiable interests
  router.get("/details/interests", async (req, res) => {
    if (req.query.search) {
      try {
        const data = await prisma.$queryRaw`SELECT * FROM interests WHERE interest LIKE ${
          "%" + req.query.search + "%"
        } ORDER BY CHAR_LENGTH(interest);`;
        return res.status(200).json(data);
      } catch (error) {
        return res
          .status(400)
          .json({ error: "Sorry, something went wrong, please try again. " });
      }
    }
    return res.status(400).json({ error: "bad request." });
  });

  //get details
  router.get("/details/:id", async (req, res) => {
    const details = await prisma.users_details.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    return res.status(200).json({ details: details });
  });

  //create new details row
  router.post("/details", verify, async (req, res) => {
    try {
      const details = await prisma.users_details.create({
        data: {
          users: {
            connect: {
              id: parseInt(req.user.id),
            },
          },
        },
      });
      return res.status(200).json({ details: details });
    } catch (error) {
      return res.status(404).json({
        error: "Sorry, something went wrong, please try again.",
      });
    }
  });

  //update a user_details attribute(s)
  //{"data": {"drink_alcohol": "No", "school": "Auckalnd university"}}
  router.put("/details", verify, async (req, res) => {
    try {
      await prisma.users_details.update({
        where: { id: req.user.id },
        data: req.body.data,
      });
      return res.status(200).json(req.body.data);
    } catch (error) {
      return res.status(400).json({
        error: "Sorry, something went wrong, please try again. " + error,
      });
    }
  });
};
