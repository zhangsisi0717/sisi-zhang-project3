const express = require("express");

const UserModel = require("./model/user.model");
const ReviewModel = require("./model/review.model");
const jwt = require("jsonwebtoken");
const auth_middleware = require("./middleware/auth_middleware");
const router = express.Router();

//create a new review
router.post("/", auth_middleware, function (request, response) {
  const newReview = {
    username: request.username,
    reviewContent: request.body.content,
    gameId: request.body.gameId,
  };

  if (!request.body.content || !request.body.gameId) {
    return response.status(401).send("missing review content or game id");
  }

  return ReviewModel.createReview(newReview)
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

module.exports = router;
