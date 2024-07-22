const bookModel = require("../../models/Book");

const addBook = async (req, res) => {
  try {
    const newBook = new bookModel({
      title: req.body.title,
      author: req.body.author,
      img: req.body.img,
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
