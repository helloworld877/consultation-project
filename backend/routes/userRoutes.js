const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");

// Authentication
router.get("/getUsers", bodyParser.json(), userController.getUsers); // Get all users
router.get("/getUser", bodyParser.json(), userController.getUser); //Get a user based on userName
router.post("/createUser", bodyParser.json(), userController.createUser); // Create a new user
router.put("/updateUser", bodyParser.json(), userController.updateUser); // Create a new user
router.post("/promoteUser", bodyParser.json(), userController.promoteUser); // promote a user to admin
router.post("/demoteUser", bodyParser.json(), userController.demoteUser); // demote a user to user
router.post(
  "/promoteToAdmin",
  bodyParser.json(),
  userController.authenticateToken,
  userController.promoteToAdmin
); // promote a user to admin
router.delete("/deleteUser", bodyParser.json(), userController.deleteUser); // delete a user
router.post("/login", bodyParser.json(), userController.login); // login a user
module.exports = router;
