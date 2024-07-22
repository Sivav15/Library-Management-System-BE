const axios = require("axios");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");

const googleCallback = async (req, res) => {
  try {
    const { token, role } = req.body;

    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );
    const { sub, name, picture, email, email_verified } = data;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = new userModel({
        googleId: sub,
        firstName: name,
        email,
        emailVerified: email_verified,
        avatar: picture,
        role,
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successfully",
      token: jwtToken,
      id: user._id,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = googleCallback;
