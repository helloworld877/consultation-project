const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");

router.get("/getUsers", bodyParser.json(), userController.getUsers); // Get all users
router.get("/getUser", bodyParser.json(), userController.getUser); //Get a user based on userName
router.post("/createUser", bodyParser.json(), userController.createUser); // Create a new user
router.post("/promoteUser", bodyParser.json(), userController.promoteUser); // promote a user to admin
router.post("/demoteUser", bodyParser.json(), userController.demoteUser); // demote a user to user
router.post(
  "/promoteToAdmin",
  bodyParser.json(),
  userController.promoteToAdmin
); // promote a user to admin

module.exports = router;
