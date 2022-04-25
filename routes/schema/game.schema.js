const Schema = require("mongoose").Schema;

const GameSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    username: String,
    description: String,
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
