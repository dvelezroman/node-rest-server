const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Required"]
  },
  price: {
    type: Number,
    required: [true, "Required"]
  },
  available: {
    type: Boolean,
    default: true
  },
  user: ObjectId
});

module.exports = mongoose.model("Product", productSchema);
