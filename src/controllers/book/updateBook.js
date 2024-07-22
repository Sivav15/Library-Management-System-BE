const bookModel = require("../../models/book");

const updateBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const { id } = req.params;
    // console.log(id);
    console.log(title, author);
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { title, author },
      { new: true, runValidators: true }
    );

    console.log(updatedBook);

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
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

module.exports = updateBook;
