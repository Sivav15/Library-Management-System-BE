const userModel = require("../../models/user");
const bookModel = require("../../models/book");

const viewAllBook = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Retrieve the user by ID
    const findUser = await userModel.findById(user_id);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Retrieve all books from the database
    const books = await bookModel.find();

    // If the user is a regular user, include borrowed information
    if (findUser.role === "user") {
      const booksWithBorrowInfo = books.map((book) => {
        const isBorrowedByUser = book.borrowedBy.some(
          (borrow) => borrow.user_id.toString() === user_id
        );
        return {
          ...book.toObject(),
          isBorrowedByUser,
        };
      });

      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        books: booksWithBorrowInfo,
      });
    } else {
      // If the user is not a regular user, return all books without the borrowed information
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        books,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = viewAllBook;
