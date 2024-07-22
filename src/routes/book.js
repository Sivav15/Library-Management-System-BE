const express = require("express");
const viewAllBook = require("../controllers/book/viewAllBook");
const updateBook = require("../controllers/book/updateBook");
const deleteBook = require("../controllers/book/deleteBook");
const addBook = require("../controllers/book/addBook");
const authenticateJWT = require("../middlewares/authenticateJWT");
const ViewBook_img = require("../controllers/book/ViewBook_img");
const borrowBook = require("../controllers/book/borrowBook");
const returnBook = require("../controllers/book/returnBook");

const router = express.Router();

router.post("/addBook", authenticateJWT, addBook);
router.get("/:user_id", authenticateJWT, viewAllBook);
router.put("/update/:id", authenticateJWT, updateBook);
router.delete("/delete/:id", authenticateJWT, deleteBook);

// view book in S3
router.get("/book_img/:key", ViewBook_img);

// borrow and return a book

router.post("/borrow_book", authenticateJWT, borrowBook);
router.post("/return_book", authenticateJWT, returnBook);

module.exports = router;
