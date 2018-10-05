const { Router } = require("express");
const router = Router();

// import all routers;
const usersRoutes = require("./users");
// ============================================
router.use("/users", usersRoutes);
// load each router on a route
// i.e: router.use('/auth', authRouter);
//router.use('/', );

router.post("/:json", (req, res, next) => {
  let id = req.params.json;
  let json = req.body.info;
  res.status(201).json({
    id,
    json
  });
});

router.get("/test", (req, res, next) => {
  res.status(200).json({
    message: "Success",
    route: "/test"
  });
});

module.exports = router;