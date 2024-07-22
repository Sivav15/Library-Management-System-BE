const upload = require("../../middlewares/uploadMiddleware");
const bookModel = require("../../models/book");

const addBook = async (req, res) => {
  try {
    upload.single("img")(req, res, async function (err) {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to upload file",
          error: err,
        });
      }

      const newBook = new bookModel({
        title: req.body.title,
        author: req.body.author,
        img: req.file.key,
      });

      const savedBook = await newBook.save();

      if (savedBook && savedBook._id) {
        res.status(201).json({
          success: true,
          message: "Book added successfully!",
          book: savedBook,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to add book",
        });
      }
    });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = addBook;
