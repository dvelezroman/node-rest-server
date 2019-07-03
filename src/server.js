const express = require("express");
const bodyParser = require("body-parser");

const app = express();

require("./config/config");

const routes = require("./routes");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// routes to API go to routes/index.js
app.use("/", routes);
// starts the server in port 3000
app.listen(process.env.PORT, () =>
	console.log(`Escuchando en puerto ${process.env.PORT}`)
);
