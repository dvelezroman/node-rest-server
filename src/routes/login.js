const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");
const router = Router();
const User = require("../models/user");

router.get("/test", (req, res, next) => {
  res.status(200).json("Todo Bien...");
});

router.post("/", (req, res) => {
  if (!req.body)
    res.status(400).json({
      error: true,
      data: {},
      msg: "Bad request"
    });
  let body = req.body;
  User.findOne({ email: body.email }, (err, foundUser) => {
    if (err) res.json(err);
    if (!foundUser)
      res.status(401).json({
        error: true,
        data: err,
        msg: "User or password incorrect"
      });
    if (!bcrypt.compareSync(body.password, foundUser.password)) {
      res.status(401).json({
        error: true,
        data: {},
        msg: "User or password incorrect"
      });
    }
    let data = foundUser;
    let token = jwt.sign({ user: foundUser }, "develop", {
      expiresIn: 60 * 60 * 24 * 30
    });
    res.status(200).json({
      error: false,
      data: data,
      token,
      msg: "Logged"
    });
  });
});

module.exports = router;
