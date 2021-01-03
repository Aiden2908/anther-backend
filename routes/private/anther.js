const router = require("express").Router();
const verify = require("../../middleware/jwt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const account = require("./account/account");

account(router, prisma, verify);

module.exports = router;
