const Schema = require("mongoose").Schema;

const GameSchema = new Schema(
  {
    title: String,
    username: String,
    reviews: [],
    releaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "games",
  }
);

module.exports = GameSchema;
