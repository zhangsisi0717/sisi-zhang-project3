const Schema = require("mongoose").Schema;

const ReviewSchema = new Schema(
  {
    content: String,
    gameId: String,
    username: String,
    releaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "reviews",
  }
);

module.exports = ReviewSchema;
