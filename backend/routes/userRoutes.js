const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");

router.get("/getUsers", bodyParser.json(), userController.getUsers); // Get all users
router.get("/getUser", bodyParser.json(), userController.getUser); //Get a user based on userName
router.post("/createUser", bodyParser.json(), userController.createUser); // Create a new user

module.exports = router;
