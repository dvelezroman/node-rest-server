const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const roles = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{PATH} is not a valid role"
};

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Required"]
  },
  email: {
    type: String,
    required: [true, "Required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Required"]
  },
  google: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: roles,
    default: "USER_ROLE"
  },
  img: {
    type: String,
    required: false
  },
  state: {
    type: Boolean,
    default: true
  }
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = mongoose.model("User", userSchema);
