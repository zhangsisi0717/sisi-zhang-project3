const mongoose = require("mongoose");

const ReviewSchema = require("../schema/review.schema");

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
  return ReviewModel.create(review).exec();
}

function getReviewByUsername(username) {
  return ReviewModel.find({
    username: username,
  }).exec();
}

function getAllReviews() {
  return ReviewModel.find().exec();
}

function getReviewById(id) {
  return ReviewModel.findById(id).exec();
}

function updateReview(id, content) {
  const filter = { _id: id };
  const update = { content: content };
  return ReviewModel.findOneAndUpdate(filter, update);
}

module.exports = {
  createReview,
  getReviewByUsername,
  getAllReviews,
  getReviewById,
};
