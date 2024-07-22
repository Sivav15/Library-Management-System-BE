const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./src/config/database");
const authRoute = require("./src/routes/auth");
const bookRoute = require("./src/routes/book");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

database();

app.get("/", (req, res) =>
  res.status(200).json({
    message: "server is running successful",
  })
);

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
