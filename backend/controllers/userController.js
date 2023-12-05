const User = require("../models/user");

const getUsers = (req, res, next) => {
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

const getUser = (req, res, next) => {
  userName = req.params.userName;
  User.findOne({ userName: userName })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

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
      res.status(201).json({ message: "User added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
};
module.exports = {
  getUsers,
  getUser,
  createUser,
};
