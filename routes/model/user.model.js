const mongoose = require("mongoose");

const UserSchema = require("../schema/user.schema");

const UserModel = mongoose.model("User", UserSchema);

function createUser(user) {
  return UserModel.create(user);
}

function getUserByUserName(username) {
  return UserModel.findOne({ username: username }).exec();
}

// async function addNewReview(username, id) {
//   let newReviews = [];
//   const user = await UserModel.findOne({ username: username });
//   newReviews = [...user.reviewIds];
//   newReviews.push(id);
//   await user.updateOne({ reviewIds: newReviews });
//   return getUserByUserName(username);
// }

module.exports = {
  createUser,
  getUserByUserName,
};
