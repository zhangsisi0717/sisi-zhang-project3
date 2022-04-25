const express = require("express");

const UserModel = require("./model/user.model");
const ReviewModel = require("./model/review.model");
const GameModel = require("./model/game.model");
const jwt = require("jsonwebtoken");
const auth_middleware = require("./middleware/auth_middleware");
const router = express.Router();

//create a new review
router.post("/create", auth_middleware, function (request, response) {
  if (!request.body.content || !request.body.gameTitle) {
    return response.status(400).send("missing review content or game title.");
  }

  const newReview = {
    username: request.username,
    content: request.body.content,
    gameTitle: request.body.gameTitle,
  };

  return GameModel.getGameByTitle(request.body.gameTitle)
    .then((game) => {
      if (!game) {
        throw new Error("NotFound");
      }
      return ReviewModel.createReview(newReview);
    })
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      if (error.message == "NotFound") {
        return response.status(400).send("Game not found.");
      }
      return response.status(400).send(error);
    });
});

// edit the content of a review
router.post("/edit", auth_middleware, function (request, response) {
  if (!request.body.content || !request.body.id) {
    return response.status(400).send("missing review content or review id.");
  }
  return ReviewModel.getReviewById(request.body.id)
    .then((review) => {
      if (!review) {
        throw new Error("NotFound");
      } else if (review.username != request.username) {
        throw new Error("Unauthorized");
      }
      return ReviewModel.updateReview(request.body.id, request.body.content);
    })
    .then((dbResponse) => {
      return response.status(200).send(dbResponse);
    })
    .catch((error) => {
      if (error.message == "NotFound") {
        return response.status(400).send("Review not found.");
      } else if (error.message == "Unauthorized") {
        return response
          .status(401)
          .send("Cannot edit review created by another user.");
      }
      return response.status(400).send(error);
    });
});

module.exports = router;
