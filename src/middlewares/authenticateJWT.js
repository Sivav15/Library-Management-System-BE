const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Token Required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Access Token Expired" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateJWT;
