const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

require("./config/config");

const routes = require("./routes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// routes to API go to routes/index.js
app.use("/", routes);
// connects to mongo
mongoose.connect(
  process.env.URI_DB,
  { useNewUrlParser: true },
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos conectada");
  }
);
// starts the server in port 3000
app.listen(process.env.PORT, () =>
  console.log(`Escuchando en puerto ${process.env.PORT}`)
);
