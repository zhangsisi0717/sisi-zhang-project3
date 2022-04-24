const mongoose = require("mongoose");

const GameSchema = require("../schema/game.schema");

const ReviewModel = mongoose.model("Game", GameSchema);

function createGame(game) {
  return ReviewModel.create(game).exec();
}

// function getReviewByUsername(username) {
//   return ReviewModel.find({
//     username: username,
//   }).exec();
// }

// function getAllReviews() {
//   return ReviewModel.find().exec();
// }

// function getReviewById(id) {
//   return ReviewModel.findById(id).exec();
// }

// function updateReview(id, content) {
//   const filter = { _id: id };
//   const update = { content: content };
//   return ReviewModel.findOneAndUpdate(filter, update);
// }

module.exports = {
  createGame,
  //   getReviewByUsername,
  //   getAllReviews,
  //   getReviewById,
};
