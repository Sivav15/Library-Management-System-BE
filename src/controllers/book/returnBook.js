const Book = require("../../models/book");

const returnBook = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    // Find the book by ID
    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if the book is borrowed by the user
    const index = book.borrowedBy.findIndex(
      (borrow) => borrow.user_id.toString() === user_id
    );
    if (index === -1) {
      return res.status(409).json({
        success: false,
        message: "You haven't borrowed this book",
      });
    }

    // Remove the user from the borrowedBy list
    book.borrowedBy.splice(index, 1);
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = returnBook;
