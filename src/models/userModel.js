const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
