const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("posts", postsSchema);