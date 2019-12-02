const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true,
    default: 0
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  restaurantname: {
    type: String,
    required: true,
    default: "N/A"
  },
  cuisine: {
    type: String,
    required: true,
    default: "N/A"
  },
  phone: {
    type: String,
    required: true,
    default: "N/A"
  },
  zipcode: {
    type: String,
    required: true,
    default: "00000"
  },
  owner: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Users = mongoose.model("User", UserSchema);