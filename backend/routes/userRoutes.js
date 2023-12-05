const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getUsers); // Get all users
router.get("/user", userController.getUser); //Get a user based on userName
router.post("/user", userController.createUser); // Create a new user

module.exports = router;
