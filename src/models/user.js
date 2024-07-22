const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    emailVerified: { type: Boolean, required: true },
    avatar: { type: String },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
