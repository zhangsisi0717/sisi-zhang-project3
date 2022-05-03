const express = require("express");

const UserModel = require("./model/user.model");
const ReviewModel = require("./model/review.model");
const GameModel = require("./model/game.model");
const jwt = require("jsonwebtoken");
const auth_middleware = require("./middleware/auth_middleware");
const router = express.Router();

//create a new review
router.post("/create", auth_middleware, function (request, response) {
  if (
    !request.body.content ||
    !request.body.rating ||
    !request.body.gameTitle
  ) {
    return response
      .status(400)
      .send("missing review content, rating or gameTitle.");
  }

  if (typeof request.body.content !== "string") {
    return response.status(400).send("content must be a string.");
  }

  if (typeof request.body.gameTitle !== "string") {
    return response.status(400).send("gameTitle must be a string.");
  }

  if (
    typeof request.body.rating !== "number" ||
    request.body.rating < 0 ||
    request.body.rating > 5
  ) {
    return response
      .status(400)
      .send("Error: rating must be a number between 0 and 5.");
  }

  const newReview = {
    username: request.username,
    content: request.body.content,
    rating: request.body.rating,
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
  if (request.body.rating) {
    if (
      typeof request.body.rating !== "number" ||
      request.body.rating < 0 ||
      request.body.rating > 5
    ) {
      return response
        .status(400)
        .send("Error: rating must be a number between 0 and 5.");
    }
  }

  if (request.body.content) {
    if (typeof request.body.content !== "string") {
      return response.status(400).send("content must be a string.");
    }
  }

  return ReviewModel.getReviewById(request.body.id)
    .then((review) => {
      if (!review) {
        throw new Error("NotFound");
      } else if (review.username != request.username) {
        throw new Error("Unauthorized");
      }

      const newContent = request.body.content
        ? request.body.content
        : review.content;
      const newRating = request.body.rating
        ? request.body.rating
        : review.rating;

      return ReviewModel.updateReview(request.body.id, newContent, newRating);
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

router.post("/delete", auth_middleware, function (request, response) {
  if (!request.body.id) {
    return response.status(400).send("missing review id.");
  }
  return ReviewModel.getReviewById(request.body.id)
    .then((review) => {
      if (!review) {
        throw new Error("NotFound");
      } else if (review.username != request.username) {
        throw new Error("Unauthorized");
      }
      return ReviewModel.deleteReview(request.body.id);
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
          .send("Cannot delete review created by another user.");
      }
      return response.status(400).send(error);
    });
});

module.exports = router;
