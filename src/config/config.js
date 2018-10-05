// =========================
// PORT
// =========================
process.env.PORT = process.env.PORT || 3000;

// =========================
// Environment
// =========================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// =========================
// URI CONECTIONS
// =========================
let uriDB =
  process.env.NODE_ENV === "dev"
    ? "mongodb://localhost:27017/cafe"
    : "mongodb://cafe-user:@123456A@ds155411.mlab.com:55411/cafe";

process.env.URI_DB = uriDB;
