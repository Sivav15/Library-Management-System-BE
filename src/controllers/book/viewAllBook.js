const bookModel = require("../../models/Book");

const viewAllBook = async (req, res) => {
  try {
    const { user_id } = req.body;

    const books = await bookModel.find(user_id);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = viewAllBook;
