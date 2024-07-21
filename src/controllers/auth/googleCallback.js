const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");

const googleCallback = async (req, res) => {
  try {
    const { token } = req.body;
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );
    const { sub, name, picture, email, email_verified } = data;
    let user = await userModel.findOne({ email });

    if (!user) {
      const newUser = new userModel({
        googleId: sub,
        firstName: name,
        email,
        emailVerified: email_verified,
        avatar: picture,
      });

      await newUser.save();
    }

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

    res.status(200).json({
      message: "Login successfully",
      token: jwtToken,
      id: newUser._id,
      avatar: newUser.avatar,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = googleCallback;
