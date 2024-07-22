const userModel = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const capitalizeFirstLetter = require("../../utils/capitalizeFirstLetter");

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstName: capitalizeFirstLetter(firstName),
      lastName: capitalizeFirstLetter(lastName),
      email,
      emailVerified: true,
      password: hashedPassword,
      role,
      avatar: `https://ui-avatars.com/api/?name=${firstName[0]}`,
    });

    await newUser.save();

    const jwtToken = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // res.cookie("token", jwtToken, {
    //   httpOnly: true, // Ensures the cookie is only accessible by the web server
    //   secure: process.env.NODE_ENV === "production", // Ensures the cookie is only used over HTTPS
    //   sameSite: "Strict", // Controls if the cookie is sent with cross-site requests
    //   maxAge: 3600000, // 1 hour in milliseconds
    // });

    res.status(201).json({
      message: "Registered successfully",
      token: jwtToken,
      id: newUser._id,
      avatar: newUser.avatar,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = register;
