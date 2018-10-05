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
    : process.env.MONGO_URI; // heroku environment variable

process.env.URI_DB = uriDB;
