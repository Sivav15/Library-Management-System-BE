const bookModel = require("../../models/Book");

const updateBook = async (req, res) => {
  try {
    const { id, title, author, img, borrowedBy } = req.body;

    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { title, author, img, borrowedBy },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = updateBook;
