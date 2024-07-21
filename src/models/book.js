const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  borrowedBy: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      borrowedAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true },
  ],
  //   stock: {
  //     type: Number,
  //     required: true,
  //     default: 1
  //   }
});

module.exports = mongoose.model("Book", BookSchema);
