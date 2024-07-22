const express = require("express");
const viewAllBook = require("../controllers/book/viewAllBook");
const updateBook = require("../controllers/book/updateBook");
const deleteBook = require("../controllers/book/deleteBook");
const addBook = require("../controllers/book/addBook");
const authenticateJWT = require("../middlewares/authenticateJWT");

const router = express.Router();

router.post("/book", authenticateJWT, addBook);
router.get("/", authenticateJWT, viewAllBook);
router.put("/book/:id", authenticateJWT, updateBook);
router.delete("/book/:id", authenticateJWT, deleteBook);

module.exports = router;
