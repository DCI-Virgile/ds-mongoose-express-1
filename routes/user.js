const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const api = express();

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    age: Number
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

router.get("/user", (req, res, next) => {
  User.find().then(users => {
    res.send(users);
  });
});

router.get("/user/:id", (req, res, next) => {
  const id = req.params.id;
  User.findById(id).then(user => {
    res.send(user);
  });
});

router.post("/user", async (req, res, next) => {
  console.log("posting something");
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const age = req.body.age;

  const newUser = await User.create({
    firstname: firstname,
    lastname: lastname,
    email: email,
    age: age
  });
});

module.exports = router;
