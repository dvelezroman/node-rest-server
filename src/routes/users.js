const { Router } = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const router = Router();
const User = require("../models/user");

router.get("/test", (req, res, next) => {
  res.status(200).json("Todo Bien...");
});

router.post("/new", (req, res) => {
  let body = req.body;
  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });
  user.save((err, userCreated) => {
    if (err)
      res.status(400).json({
        error: true,
        msg: `There was an error when storing a new user: ${err}`
      });
    res.status(201).json(userCreated);
  });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["name", "email", "role", "img", "state"]);
  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userModified) => {
      if (err)
        res.status(400).json({
          error: true,
          msg: err
        });
      res.status(201).json({
        error: false,
        res: userModified
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true, runValidators: true },
    (err, userModified) => {
      if (err)
        res.status(400).json({
          error: true,
          msg: err
        });
      res.status(201).json({
        error: false,
        res: userModified
      });
    }
  );
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, userFound) => {
    if (err) throw err;
    res.status(200).json(userFound);
  });
});

router.get("/", (req, res) => {
  let from = req.query.from || 0;
  let pag = req.query.pag || 5;
  User.find({ state: true }, "name email role img state")
    .skip(Number(from))
    .limit(Number(pag))
    .exec((err, users) => {
      if (err) throw err;
      User.count({ state: true }, (err, count) => {
        res.status(200).json({
          err: "false",
          count,
          users
        });
      });
    });
});
module.exports = router;
