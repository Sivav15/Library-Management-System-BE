const Book = require("../../models/book");

const borrowBook = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (
      book.borrowedBy.some((borrow) => borrow.user_id.toString() === user_id)
    ) {
      return res.status(409).json({
        success: false,
        message: "You have already borrowed this book",
      });
    }

    book.borrowedBy.push({ user_id: user_id });
    await book.save();

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
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

module.exports = borrowBook;
