const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
///////////////////////////

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.PRIVILEGE = user.role;
    next();
  });
};

/////////////////////////////
//returns all users
const getUsers = (req, res, next) => {
  if (req.PRIVILEGE !== "admin") {
    res.status(403).json({ error: "not authorized" });
  }
  User.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log("Couldn't get users");
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

//gets a user based on a username
const getUser = (req, res, next) => {
  userName = req.body.userName;
  User.findOne({ userName: userName })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

//creates a user
const createUser = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const city = req.body.city;
  const address = req.body.address;
  const emailAddress = req.body.emailAddress;
  const role = req.body.role;
  const user = new User({
    userName,
    password,
    firstName,
    lastName,
    birthDate,
    gender,
    city,
    address,
    emailAddress,
    role,
  });
  user
    .save()
    .then((result) => {
      console.log("User added Successfully");
      res.status(200).json({ message: "User added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

const updateUser = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const birthDate = req.body.birthDate;
  const gender = req.body.gender;
  const city = req.body.city;
  const address = req.body.address;
  const filter = { userName: req.body.userName };
  const update = {
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate,
    gender: gender,
    city: city,
    address: address,
  };
  User.findOneAndUpdate(filter, update)
    .then((result) => {
      console.log("User Info Updated Successfully");
      res.status(200).json({ message: "User Info Updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};
//promote user to admin
const promoteUser = (req, res, next) => {
  const filter = { userName: req.body.userName };
  const update = { role: "manager" };
  if (req.PRIVILEGE !== "admin") {
    res.status(403).json({ error: "not authorized" });
  }
  User.findOneAndUpdate(filter, update)
    .then((result) => {
      console.log("User promoted Successfully");
      res.status(200).json({ message: "User promoted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

//demote user to user
const demoteUser = (req, res, next) => {
  const filter = { userName: req.body.userName };
  const update = { role: "user" };
  if (req.PRIVILEGE !== "admin") {
    res.status(403).json({ error: "not authorized" });
  }
  User.findOneAndUpdate(filter, update)
    .then((result) => {
      console.log("User demoted Successfully");
      res.status(200).json({ message: "User demoted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

//promote user to admin
const promoteToAdmin = (req, res, next) => {
  const filter = { userName: req.body.userName };
  const update = { role: "admin" };

  if (req.PRIVILEGE !== "admin") {
    res.status(403).json({ error: "not authorized" });
  }
  User.findOneAndUpdate(filter, update)
    .then((result) => {
      console.log("User promoted to admin Successfully");
      res.status(200).json({ message: "User promoted to admin successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

//delete a user
const deleteUser = (req, res, next) => {
  if (req.PRIVILEGE !== "admin") {
    res.status(403).json({ error: "not authorized" });
  }
  User.findOneAndDelete({ userName: req.body.userName })
    .then((result) => {
      console.log("User deleted Successfully");
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};

//login a user
const login = (req, res, next) => {
  //get username and password

  const userName = req.body.userName;
  const password = req.body.password;

  // check if user is correct
  User.findOne({ userName: userName, password: password })
    .then((result) => {
      if (result == null) {
        res.status(404).json({
          message: "user not found",
        });
      }
      //give the user the token
      console.log(result);
      const user = { role: result.role };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      //return user data and access token
      res.status(200).json({
        message: "Login Successful",
        result,
        accessToken: accessToken,
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  promoteUser,
  demoteUser,
  promoteToAdmin,
  updateUser,
  deleteUser,
  login,
  authenticateToken,
};
