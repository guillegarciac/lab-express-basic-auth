const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add a valid email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  hashedPassword: {
    type: String,
    required: [true, 'Please add a password']
  }
},
  {
    timestamps: true
  });

const User = model("User", userSchema);

module.exports = User;
